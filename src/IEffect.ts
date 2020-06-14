export interface IEffect {
  execute(): void;
  stop(): void;
}
