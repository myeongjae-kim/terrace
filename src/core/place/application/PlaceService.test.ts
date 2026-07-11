import { describe, expect, it, vi } from "vitest";
import type { Place } from "#/core/place/domain";
import { PlaceService } from "./PlaceService";

const place = {
	id: "1",
	latitude: 37.5665,
	longitude: 126.978,
	createdAt: null,
	updatedAt: null,
} as Place;

function createService(existing: Place | null = null) {
	const commandPort = {
		create: vi.fn(async () => place),
		softDelete: vi.fn(async () => true),
	};
	const queryPort = {
		listActive: vi.fn(async () => [place]),
		findActiveByCoordinates: vi.fn(async () => existing),
	};
	return {
		service: new PlaceService(commandPort, queryPort),
		commandPort,
		queryPort,
	};
}

describe("PlaceService", () => {
	it("rejects coordinates outside latitude and longitude ranges", async () => {
		const { service } = createService();
		await expect(
			service.create({ latitude: 91, longitude: 0 }),
		).rejects.toThrow("위도");
		await expect(
			service.create({ latitude: 0, longitude: 181 }),
		).rejects.toThrow("경도");
	});

	it("does not create duplicate active coordinates", async () => {
		const { service, commandPort } = createService(place);
		await expect(
			service.create({ latitude: place.latitude, longitude: place.longitude }),
		).resolves.toEqual(place);
		expect(commandPort.create).not.toHaveBeenCalled();
	});

	it("lists active places and soft deletes by id", async () => {
		const { service, commandPort } = createService();
		await expect(service.list()).resolves.toEqual([place]);
		await expect(service.delete({ id: place.id })).resolves.toBe(true);
		expect(commandPort.softDelete).toHaveBeenCalledWith({ id: place.id });
	});
});
