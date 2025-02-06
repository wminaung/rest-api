import { JwtAuthPayload } from "../types/jwtAuthPayload";

export interface ICreate<ReturnDTO, CreateSchema> {
  create(data: CreateSchema, user?: JwtAuthPayload): Promise<ReturnDTO>;
}

export interface IGetAll<ReturnDTO> {
  getAll(): Promise<ReturnDTO[]>;
}

export interface IGet<ReturnDTO> {
  get(id: string): Promise<ReturnDTO | null>;
}

export interface IUpdate<ReturnDTO, UpdateSchema> {
  update(
    id: string,
    data: UpdateSchema,
    user?: JwtAuthPayload
  ): Promise<ReturnDTO>;
}

export interface IDelete<ReturnDTO> {
  delete(id: string, user?: JwtAuthPayload): Promise<ReturnDTO>;
}
