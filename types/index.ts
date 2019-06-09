export interface Opts {
  argv?: string
  env?: { [s: string]: string }
  platform?: string
  cwd?: string
  unsetEnvValues?: boolean
  parseValues?: boolean
}

export interface Milieu {
  new (applicationName: string, defaults: object, opts?: Opts)
  [s: string]: any
}

export default interface createMilieu {
  (applicationName: string, defaults: object, opts: Opts): Milieu
}
