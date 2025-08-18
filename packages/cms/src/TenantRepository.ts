import delay from "./delay";
import {Database} from "./database";


export default function TenantRepository(host: string){

    console.debug("TenantRepository", host);

    const slug = Object.keys(Database).find(slug=> Database[slug].hosts.includes(host) );
    if(!slug) return null;

    const data = Database[slug];
    if(!data) return null;

    return {
        async get(){
          return data;
        },
        async getSlug(){
            return slug;
        },
        async getPage(path: string){
            await delay(1000);

            const context: {id: string|null} = {
                id: null,
            }

            const page =  data.pages.find(p => {

                if(p.path.endsWith("/:id")){
                    const pathWithoutId = p.path.replace("/:id", "");
                    if(path.startsWith(pathWithoutId)){
                        context.id = path.split("/").pop() ?? null;
                        return true;
                    }
                }

                return p.path == path;
            });

            if(!page){
                return null;
            }

            return {
                page,
                context,
            }
        },
    }
}
