import { and, asc, eq, isNull } from "drizzle-orm";
import type { IsoDateTimeString } from "#/core/common/domain";
import type { PlaceCommandPort } from "#/core/place/application/port/out/PlaceCommandPort";
import type { PlaceQueryPort } from "#/core/place/application/port/out/PlaceQueryPort";
import type { Place, PlaceId } from "#/core/place/domain";
import { db } from "#/db/index";
import { placeTable } from "#/db/schema";

type PlaceRow = typeof placeTable.$inferSelect;

function toNumericId(id: PlaceId) {
	const numericId = Number(id);
	if (!Number.isInteger(numericId) || numericId <= 0) {
		throw new Error("잘못된 장소 id입니다.");
	}
	return numericId;
}

function toIsoDateTime(value: Date | null) {
	return (value ? value.toISOString() : null) as IsoDateTimeString | null;
}

function toPlace(row: PlaceRow): Place {
	if (row.latitude === null || row.longitude === null) {
		throw new Error("장소 좌표가 없습니다.");
	}

	return {
		id: String(row.id) as PlaceId,
		latitude: row.latitude,
		longitude: row.longitude,
		createdAt: toIsoDateTime(row.createdAt),
		updatedAt: toIsoDateTime(row.updatedAt),
	};
}

export class PlaceDrizzleAdapter implements PlaceCommandPort, PlaceQueryPort {
	async create(input: Parameters<PlaceCommandPort["create"]>[0]) {
		const now = new Date();
		const [row] = await db
			.insert(placeTable)
			.values({
				latitude: input.latitude,
				longitude: input.longitude,
				createdAt: now,
				updatedAt: now,
			})
			.returning();

		if (!row) throw new Error("장소 생성에 실패했습니다.");
		return toPlace(row);
	}

	async listActive() {
		const rows = await db
			.select()
			.from(placeTable)
			.where(isNull(placeTable.deletedAt))
			.orderBy(asc(placeTable.createdAt), asc(placeTable.id));
		return rows.map(toPlace);
	}

	async findActiveByCoordinates(
		input: Parameters<PlaceQueryPort["findActiveByCoordinates"]>[0],
	) {
		const [row] = await db
			.select()
			.from(placeTable)
			.where(
				and(
					eq(placeTable.latitude, input.latitude),
					eq(placeTable.longitude, input.longitude),
					isNull(placeTable.deletedAt),
				),
			)
			.limit(1);
		return row ? toPlace(row) : null;
	}

	async softDelete(input: Parameters<PlaceCommandPort["softDelete"]>[0]) {
		const rows = await db
			.update(placeTable)
			.set({ deletedAt: new Date(), updatedAt: new Date() })
			.where(
				and(
					eq(placeTable.id, toNumericId(input.id)),
					isNull(placeTable.deletedAt),
				),
			)
			.returning({ id: placeTable.id });
		return rows.length > 0;
	}
}
