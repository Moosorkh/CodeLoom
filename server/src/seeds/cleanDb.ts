import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    // Ensure the model and db properties exist before accessing them
    const model = models[modelName];
    if (!model || !model.db || !model.db.db) {
      throw new Error(`Invalid model or database connection for ${modelName}`);
    }

    let modelExists = await model.db.db.listCollections({
      name: collectionName,
    }).toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};