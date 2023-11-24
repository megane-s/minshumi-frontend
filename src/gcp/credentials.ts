import { StorageOptions } from "@google-cloud/storage"

export const credentials: StorageOptions["credentials"] = {
    client_email: process.env.GCP_SERVICE_ACCOUNT_CLIENT_EMAIL,
    private_key: process.env.GCP_SERVICE_ACCOUNT_PRIVATE_KEY?.replaceAll("\\n", "\n"),
}
