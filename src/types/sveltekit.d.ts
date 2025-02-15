import { App_Locals } from "$interface/app_locals";

declare module '@sveltejs/kit' {
  interface RequestEvent {
    locals: App_Locals;
  }
}