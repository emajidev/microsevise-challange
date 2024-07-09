import { Client } from "@elastic/elasticsearch";
const clientElastic = new Client({
  node: "https://localhost:9200",
});
export default clientElastic;
