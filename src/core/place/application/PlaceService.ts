import { Autowired } from "#/core/config/Autowired";
import type { CreatePlaceInput, Place, PlaceId } from "#/core/place/domain";
import type { CreatePlaceUseCase } from "./port/in/CreatePlaceUseCase";
import type { DeletePlaceUseCase } from "./port/in/DeletePlaceUseCase";
import type { ListPlacesUseCase } from "./port/in/ListPlacesUseCase";
import type { PlaceCommandPort } from "./port/out/PlaceCommandPort";
import type { PlaceQueryPort } from "./port/out/PlaceQueryPort";

function assertCoordinates({ latitude, longitude }: CreatePlaceInput) {
	if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
		throw new Error("위도는 -90에서 90 사이여야 합니다.");
	}

	if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
		throw new Error("경도는 -180에서 180 사이여야 합니다.");
	}
}

export class PlaceService
	implements CreatePlaceUseCase, ListPlacesUseCase, DeletePlaceUseCase
{
	constructor(
		@Autowired("PlaceCommandPort")
		private readonly placeCommandPort: PlaceCommandPort,
		@Autowired("PlaceQueryPort")
		private readonly placeQueryPort: PlaceQueryPort,
	) {}

	async create(input: CreatePlaceInput): Promise<Place> {
		assertCoordinates(input);
		const existing = await this.placeQueryPort.findActiveByCoordinates(input);

		if (existing) {
			return existing;
		}

		return await this.placeCommandPort.create(input);
	}

	list(): Promise<readonly Place[]> {
		return this.placeQueryPort.listActive();
	}

	delete(input: { id: PlaceId }): Promise<boolean> {
		return this.placeCommandPort.softDelete(input);
	}
}
