import { useQuery } from "@tanstack/react-query";

export interface ListItems {
  id: number;
  name: string;
  email: string;
  phone: string;
}

async function get(url: string) {
  try {
    let res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let json = await res.json();
    return json;
  } catch (error) {
    return { error: String(error) };
  }
}

export function useAllUserInfo() {
  return useQuery<ListItems[], Error>({
    queryKey: ["userInfo"],
    queryFn: async () => {
      let userInfo = (await get(
        "https://jsonplaceholder.typicode.com/users"
      )) as ListItems[];

      if (!userInfo) throw new Error("User Information not found");
      return userInfo;
    },
  });
}
