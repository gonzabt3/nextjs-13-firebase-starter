import { addDocumentToCollection } from '../index';

import { firestore } from 'firebase/app'; // replace with the actual path to your firebase module

jest.mock('firebase/app', () => ({
  firestore: jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnValue({
      add: jest.fn().mockResolvedValue({ id: 'mocked-id' }),
    }),
  }),
}));

describe('addDocumentToCollection', () => {
  it('should add a document to the collection', async () => {
    const collectionPath = 'test-collection';
    const data = { test: 'data' };
    await addDocumentToCollection(collectionPath, data);
    expect(firestore().collection).toHaveBeenCalledWith(collectionPath);
    expect(firestore().collection().add).toHaveBeenCalledWith(data);
    //expect(console.log).toHaveBeenCalledWith('Document added with ID: mocked-id');
  });
});