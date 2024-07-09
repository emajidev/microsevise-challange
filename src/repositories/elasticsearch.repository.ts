// src/repositories/ElasticRepository.ts
import { Client } from "@elastic/elasticsearch";
import { Service } from "typedi";

@Service()
export class ElasticRepository {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async createIndex(index: string, schema: object) {
    return this.client.indices.create({
      index,
      body: schema,
    });
  }

  async indexDocument(index: string, id: string, document: object) {
    return this.client.index({
      index,
      id,
      body: document,
    });
  }

  async getDocument(index: string, id: string) {
    return this.client.get({
      index,
      id,
    });
  }

  async updateDocument(index: string, id: string, document: object) {
    return this.client.update({
      index,
      id,
      body: {
        doc: document,
      },
    });
  }

  async deleteDocument(index: string, id: string) {
    return this.client.delete({
      index,
      id,
    });
  }

  async search(index: string, query: object) {
    return this.client.search({
      index,
      body: query,
    });
  }
}
