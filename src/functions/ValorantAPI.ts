import axios from "axios";
import { AxiosResponse } from "axios";

const API_VALORANT: string = "https://valorant-api.com/v1/agents?isPlayableCharacter=true";

export async function getApiData(): Promise<unknown> {
    try {
        const response: AxiosResponse = await axios.get(API_VALORANT);
    
        if (response.status !== 200) {
            throw new Error(`API request failed with status code ${response.status}`);
        }
        
        const agentsData: unknown = response.data?.data;

        if (typeof agentsData !== "object" || agentsData === null) {
            throw new Error("Unexpected API response format: 'data' property is not an object");
        }
        return agentsData;
    } catch (error) {
        console.error("Failed to fetch agent data:", error);
        throw new Error("Failed to fetch agent data from API.");
    }
}

