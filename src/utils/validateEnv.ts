import { cleanEnv, str, port } from "envalid";

const validateEnv = (): void => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port({ default: 8280 }),
    NEWS_DATA_API_KEY: str(),
    DB_TYPE: str(),
    DEV_DB_NAME: str(),
    TEST_DB_NAME: str(),
    PROD_DB_NAME: str(),
    DB_HOST: str(),
    DB_PORT: str(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    OPENAI_API_KEY: str(),
  });
};

export default validateEnv;
