import axios from "axios";

function axiosFunction(configs: any, resolve:any, reject:any ):Promise<any> {
    const instance = axios.create({
        baseURL: ""
    });

    instance.interceptors.request.use(
        async (config) => {
            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            return null;
        }
    );

    return instance.request(configs).then((res) => { resolve(res?.data); }).catch((err) => { reject(err); });
}

export class PokemonService {
    static GetPokemonList(offset: number, limit: number = 20):Promise<any> {
        return new Promise((resolve, reject) => {
            let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
            const config = {
                method: "get",
                contentType: "application/json",
                url: url
            };

            axiosFunction(config, resolve, reject);
        });
    }
    static GetPokemonDetail(id: number):Promise<any> {
        return new Promise((resolve, reject) => {
            let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
            const config = {
                method: "get",
                contentType: "application/json",
                url: url
            };

            axiosFunction(config, resolve, reject);
        });
    }
}