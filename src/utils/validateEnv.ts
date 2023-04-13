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
    KAKAO_REDIRECT_URI: str(),
    KAKAO_CLIENT_ID: str(),
    CLOUD_NAME: str(),
    CLOUD_API_KEY: str(),
    CLOUD_API_SECRET: str(),
  });
};

export default validateEnv;
