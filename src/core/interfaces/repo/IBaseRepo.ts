export interface ICreate<ReturnDTO, CreateSchema> {
  create(data: CreateSchema): Promise<ReturnDTO>;
}

export interface IGetAll<ReturnDTO> {
  getAll(): Promise<ReturnDTO[]>;
}

export interface IGet<ReturnDTO> {
  get(id: string): Promise<ReturnDTO | null>;
}

export interface IUpdate<ReturnDTO, UpdateSchema> {
  update(id: string, data: UpdateSchema): Promise<ReturnDTO>;
}

export interface IDelete<ReturnDTO> {
  delete(id: string): Promise<ReturnDTO>;
}
