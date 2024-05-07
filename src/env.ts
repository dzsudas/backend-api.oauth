import {cleanEnv, str} from "envalid";
import * as dotenv from "dotenv";
dotenv.config();
export const env = cleanEnv(process.env, {
    AZURE_AD_TENANT_ID: str(),
    AUDIENCE: str()
})