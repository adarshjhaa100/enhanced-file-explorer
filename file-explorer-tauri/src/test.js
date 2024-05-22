export const data = [
  {
    dir: "test-folder",
    isFolder: true,
    files: [
      {
        dir: "subfolder-1",
        isFolder: true,
        files: [{ dir: "subfolder-1-file-1", isFolder: false }],
      },
      {
        dir: "subfolder-2",
        isFolder: false,
        files: [],
      },
      {
        dir: "subfolder-3",
        isFolder: true,
        files: [
          { dir: "subfolder-3-file-1", isFolder: false, files: [] },
          {
            dir: "subfolder-3-file-2",
            isFolder: true,
            files: [
              {
                dir: "subfolder-3-file-3",
                isFolder: false,
                files: [],
              },
              { dir: "subfolder-3-file-4", isFolder: false, files: [] },
              {
                dir: "subfolder-3-file-4",
                isFolder: false,
                files: [],
              },
            ],
          },
        ],
      },
    ],
  },
];
