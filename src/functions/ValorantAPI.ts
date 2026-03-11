import axios from "axios";
import { AxiosResponse } from "axios";

const API_VALORANT: string = "https://valorant-api.com/v1/agents?isPlayableCharacter=true";
const API_BUDDIES: string = "https://valorant-api.com/v1/buddies";
const API_WEAPONS: string = "https://valorant-api.com/v1/weapons";

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

export async function getBuddiesData(): Promise<unknown> {
    try {
        const response: AxiosResponse = await axios.get(API_BUDDIES);

        if (response.status !== 200) {
            throw new Error(`API request failed with status code ${response.status}`);
        }
        
        const buddiesData: unknown = response.data?.data;

        if (typeof buddiesData !== "object" || buddiesData === null) {
            throw new Error("Unexpected API response format: 'data' property is not an object");
        }
        return buddiesData;
    } catch (error) {
        console.error("Failed to fetch buddies data:", error);
        throw new Error("Failed to fetch buddies data from API.");
    }
}

export async function getWeaponsData(): Promise<unknown> {
    try {
        const response: AxiosResponse = await axios.get(API_WEAPONS);

        if (response.status !== 200) {
            return Promise.reject(new Error(`API request failed with status code ${response.status}`));
        }

        const weaponsData: unknown = response.data?.data;

        if (typeof weaponsData !== "object" || weaponsData === null) {
            return Promise.reject(new Error("Unexpected API response format: 'data' property is not an object"));
        }

        return weaponsData;
    } catch (error) {
        console.error("Failed to fetch weapons data:", error);
        throw new Error("Failed to fetch weapons data from API.");
    }
}
