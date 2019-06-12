declare namespace milieu {

  export interface Opts {
    argv?: string
    env?: { [s: string]: string }
    platform?: string
    cwd?: string
    unsetEnvValues?: boolean
    parseValues?: boolean
  }

  export class MilieuConstructor<Config> {
    constructor (applicationName: string, defaults: Config, opts?: Opts)
  }

  export type Milieu<Config> = Config & MilieuConstructor<Config>
  export const Milieu: new <Config>(applicationName: string, defaults: Config, opts?: Opts) => Milieu<Config>
}

declare function milieu<Config>(applicationName: string, defaults: Config, opts?: milieu.Opts): milieu.Milieu<Config>

export = milieu
