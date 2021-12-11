import { delimiter, dirname } from 'path'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    jwt: "dev-jwt",
    clientPath: path.join(__dirname, "..", "./client/"),
}