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

export interface createMilieu {
  (applicationName: string, defaults: object, opts?: Opts): Milieu
}

export const Milieu: Milieu
declare const createMilieu: createMilieu
export default createMilieu
