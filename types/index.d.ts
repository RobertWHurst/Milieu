declare namespace milieu {

  export interface Opts {
    argv?: string
    env?: { [s: string]: string }
    platform?: string
    cwd?: string
    unsetEnvValues?: boolean
    parseValues?: boolean
  }

  export class MilieuConstructor<Config extends object> {
    constructor (applicationName: string, defaults: Config, opts?: Opts)
    explain (): { [K in keyof Config]: { val: Config[K], src: string } }
    printExplainTable (): void
    toObject (): Config
    toJSON (): Config
  }

  export type Milieu<Config extends object> = Config & MilieuConstructor<Config>
  export const Milieu: new <Config extends object>(
    applicationName: string,
    defaults: Config,
    opts?: Opts
  ) => Milieu<Config>
}

declare function milieu<Config extends object>(
  applicationName: string,
  defaults: Config,
  opts?: milieu.Opts
): milieu.Milieu<Config>

export = milieu
