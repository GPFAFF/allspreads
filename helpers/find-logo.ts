import path from 'path';
import { readdir } from 'fs/promises';

const findByName = async (dir, name) => {
  const matchedFiles = [];

  const files = await readdir(dir);

  for (const file of files) {
    // Method 1:
    const filename = path.parse(file).name;

    if (filename === name) {
      matchedFiles.push(file);
    }
  }

  return matchedFiles;
};
