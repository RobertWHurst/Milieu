declare namespace milieu {
  export interface Opts {
    argv?: string;
    env?: { [s: string]: string };
    platform?: string;
    cwd?: string;
    unsetEnvValues?: boolean;
    parseValues?: boolean;
  }

  export type Explanation<Config> = {
    [Key in keyof Config]: Config[Key] extends object
      ? Explanation<Config[Key]>
      : { val: Config[Key]; src: string }
  };

  export class MilieuConstructor<Config extends object> {
    constructor(applicationName: string, defaults: Partial<Config>, opts?: Opts);
    explain(): Explanation<Config>;
    printExplainTable(): void;
    toObject(): Config;
    toJSON(): Config;
    set(configUpdate: Partial<Config>): void
  }

  export type Milieu<Config extends object> =
    Readonly<Config> & MilieuConstructor<Config>;

  export const Milieu: new <Config extends object>(
    applicationName: string,
    defaults: Partial<Config>,
    opts?: Opts
  ) => Milieu<Config>;
}

declare function milieu<Config extends object>(
  applicationName: string,
  defaults: Partial<Config>,
  opts?: milieu.Opts
): milieu.Milieu<Config>;

export = milieu;
