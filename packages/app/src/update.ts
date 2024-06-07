import { Auth, Update } from "@calpoly/mustang";
// @ts-ignore
import { Profile } from "server/models";
import { Msg } from "./messages";
import { Model } from "./model";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "profile/save":
      saveProfile(message[1], user).then((profile) =>
        apply((model) => ({ ...model, profile }))
      );
      break;
    // put the rest of your cases here
    case "profile/select":
      selectProfile(message[1], user).then((profile) =>
        apply((model) => ({ ...model, profile }))
      );
      break;
    default:
      // @ts-ignore
      const unhandled: never = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
}

function saveProfile(
    msg: {
      userid: string;
      profile: Profile;
    },
    user: Auth.User
  ) {
    return fetch(`/api/profiles/${msg.userid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...Auth.headers(user)
      },
      body: JSON.stringify(msg.profile)
    })
      .then((response: Response) => {
        if (response.status === 200) return response.json();
        return undefined;
      })
      .then((json: unknown) => {
        if (json) return json as Profile;
        return undefined;
      });
  }

  function selectProfile(
    msg: { userid: string },
    user: Auth.User
  ) {
    return fetch(`/api/profiles/${msg.userid}`, {
      headers: Auth.headers(user)
    })
      .then((response: Response) => {
        if (response.status === 200) {
          return response.json();
        }
        return undefined;
      })
      .then((json: unknown) => {
        if (json) {
          console.log("Profile:", json);
          return json as Profile;
        }
      });
  }