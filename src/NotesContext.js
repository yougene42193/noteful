import React from 'react';

export default React.createContext({
    folders: [],
    notes: [],
    addFolder: () => {},
    addNote: () => {},
    deleteFolder: () => {},
    deleteNote: () => {},
    editFolder: () => {},
    editNote: () => {},
    getFolder: () => {},
    getNote: () => {}
});
