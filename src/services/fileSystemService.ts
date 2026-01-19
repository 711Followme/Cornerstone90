/**
 * File System Access API Service
 * Provides real file read/write capabilities for Admin dashboard
 * 
 * IMPORTANT: This uses the browser's File System Access API
 * Limitations:
 * - Works in Chrome/Edge/Opera (not Firefox/Safari yet)
 * - Requires user permission for each operation
 * - Files are accessed from user's local file system
 * - Cannot directly modify deployed code on server
 */

export interface FileItem {
  path: string;
  name: string;
  type: 'file' | 'directory';
  extension?: string;
}

class FileSystemService {
  private rootHandle: FileSystemDirectoryHandle | null = null;
  private currentFile: FileSystemFileHandle | null = null;

  /**
   * Check if File System Access API is supported
   */
  isSupported(): boolean {
    return 'showDirectoryPicker' in window && 'showOpenFilePicker' in window;
  }

  /**
   * Request access to project directory
   */
  async requestDirectoryAccess(): Promise<FileSystemDirectoryHandle | null> {
    if (!this.isSupported()) {
      throw new Error('File System Access API not supported in this browser. Please use Chrome, Edge, or Opera.');
    }

    try {
      // @ts-ignore - TypeScript types may not be updated
      this.rootHandle = await window.showDirectoryPicker({
        mode: 'readwrite',
        startIn: 'documents'
      });
      console.log('[FileSystem] Directory access granted:', this.rootHandle.name);
      return this.rootHandle;
    } catch (error) {
      console.error('[FileSystem] Directory access denied:', error);
      return null;
    }
  }

  /**
   * Read file content from project
   */
  async readFile(filePath: string): Promise<string> {
    if (!this.rootHandle) {
      throw new Error('No directory access. Please select project directory first.');
    }

    try {
      const fileHandle = await this.getFileHandle(filePath);
      const file = await fileHandle.getFile();
      const content = await file.text();
      
      console.log('[FileSystem] Read file:', filePath, `(${content.length} chars)`);
      return content;
    } catch (error) {
      console.error('[FileSystem] Error reading file:', error);
      throw new Error(`Failed to read file: ${filePath}`);
    }
  }

  /**
   * Write content to file
   */
  async writeFile(filePath: string, content: string): Promise<boolean> {
    if (!this.rootHandle) {
      throw new Error('No directory access. Please select project directory first.');
    }

    try {
      const fileHandle = await this.getFileHandle(filePath, true);
      // @ts-ignore
      const writable = await fileHandle.createWritable();
      await writable.write(content);
      await writable.close();
      
      console.log('[FileSystem] Wrote file:', filePath, `(${content.length} chars)`);
      return true;
    } catch (error) {
      console.error('[FileSystem] Error writing file:', error);
      throw new Error(`Failed to write file: ${filePath}`);
    }
  }

  /**
   * Get file handle from path
   */
  private async getFileHandle(
    filePath: string, 
    create: boolean = false
  ): Promise<FileSystemFileHandle> {
    if (!this.rootHandle) {
      throw new Error('No directory access');
    }

    const parts = filePath.split('/').filter(p => p);
    let currentHandle: FileSystemDirectoryHandle = this.rootHandle;

    // Navigate through directories
    for (let i = 0; i < parts.length - 1; i++) {
      try {
        currentHandle = await currentHandle.getDirectoryHandle(parts[i], { create });
      } catch (error) {
        throw new Error(`Directory not found: ${parts.slice(0, i + 1).join('/')}`);
      }
    }

    // Get the file
    const fileName = parts[parts.length - 1];
    try {
      return await currentHandle.getFileHandle(fileName, { create });
    } catch (error) {
      throw new Error(`File not found: ${filePath}`);
    }
  }

  /**
   * List files in directory
   */
  async listDirectory(dirPath: string = ''): Promise<FileItem[]> {
    if (!this.rootHandle) {
      throw new Error('No directory access. Please select project directory first.');
    }

    try {
      let currentHandle = this.rootHandle;
      
      if (dirPath) {
        const parts = dirPath.split('/').filter(p => p);
        for (const part of parts) {
          currentHandle = await currentHandle.getDirectoryHandle(part);
        }
      }

      const items: FileItem[] = [];
      // @ts-ignore
      for await (const entry of currentHandle.values()) {
        const item: FileItem = {
          path: dirPath ? `${dirPath}/${entry.name}` : entry.name,
          name: entry.name,
          type: entry.kind === 'directory' ? 'directory' : 'file',
        };

        if (entry.kind === 'file') {
          const parts = entry.name.split('.');
          item.extension = parts.length > 1 ? parts.pop() : undefined;
        }

        items.push(item);
      }

      console.log('[FileSystem] Listed directory:', dirPath, `(${items.length} items)`);
      return items;
    } catch (error) {
      console.error('[FileSystem] Error listing directory:', error);
      throw new Error(`Failed to list directory: ${dirPath}`);
    }
  }

  /**
   * Create new file
   */
  async createFile(filePath: string, content: string = ''): Promise<boolean> {
    return this.writeFile(filePath, content);
  }

  /**
   * Delete file
   */
  async deleteFile(filePath: string): Promise<boolean> {
    if (!this.rootHandle) {
      throw new Error('No directory access');
    }

    try {
      const parts = filePath.split('/').filter(p => p);
      let currentHandle: FileSystemDirectoryHandle = this.rootHandle;

      // Navigate to parent directory
      for (let i = 0; i < parts.length - 1; i++) {
        currentHandle = await currentHandle.getDirectoryHandle(parts[i]);
      }

      // Remove the file
      const fileName = parts[parts.length - 1];
      await currentHandle.removeEntry(fileName);
      
      console.log('[FileSystem] Deleted file:', filePath);
      return true;
    } catch (error) {
      console.error('[FileSystem] Error deleting file:', error);
      throw new Error(`Failed to delete file: ${filePath}`);
    }
  }

  /**
   * Open single file picker
   */
  async openFilePicker(): Promise<{ handle: FileSystemFileHandle; content: string } | null> {
    if (!this.isSupported()) {
      throw new Error('File System Access API not supported');
    }

    try {
      // @ts-ignore
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'Code Files',
            accept: {
              'text/*': ['.tsx', '.ts', '.js', '.jsx', '.css', '.json', '.md']
            }
          }
        ],
        multiple: false
      });

      const file = await fileHandle.getFile();
      const content = await file.text();
      
      this.currentFile = fileHandle;
      console.log('[FileSystem] Opened file:', fileHandle.name);
      
      return { handle: fileHandle, content };
    } catch (error) {
      console.error('[FileSystem] File picker cancelled or failed:', error);
      return null;
    }
  }

  /**
   * Save file picker
   */
  async saveFilePicker(suggestedName: string, content: string): Promise<boolean> {
    if (!this.isSupported()) {
      throw new Error('File System Access API not supported');
    }

    try {
      // @ts-ignore
      const fileHandle = await window.showSaveFilePicker({
        suggestedName,
        types: [
          {
            description: 'Code Files',
            accept: {
              'text/*': ['.tsx', '.ts', '.js', '.jsx', '.css', '.json', '.md']
            }
          }
        ]
      });

      // @ts-ignore
      const writable = await fileHandle.createWritable();
      await writable.write(content);
      await writable.close();
      
      console.log('[FileSystem] Saved file:', fileHandle.name);
      return true;
    } catch (error) {
      console.error('[FileSystem] Save cancelled or failed:', error);
      return false;
    }
  }

  /**
   * Get directory name
   */
  getDirectoryName(): string | null {
    return this.rootHandle?.name || null;
  }

  /**
   * Check if directory is open
   */
  hasDirectoryAccess(): boolean {
    return this.rootHandle !== null;
  }

  /**
   * Clear directory access
   */
  clearAccess(): void {
    this.rootHandle = null;
    this.currentFile = null;
    console.log('[FileSystem] Cleared directory access');
  }
}

// Export singleton instance
export const fileSystemService = new FileSystemService();

// Export class for testing
export default FileSystemService;
