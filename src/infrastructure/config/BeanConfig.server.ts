import type { BeanConfig } from "inversify-typesafe-spring-like";
import { ArticleCrudService } from "#/core/article/application/ArticleCrudService";
import { ArticlePublishedQueryService } from "#/core/article/application/ArticlePublishedQueryService";
import { AuthService } from "#/core/auth/application/AuthService";
import type { Beans } from "#/core/config/DependencyTokens";
import { SearchGeocodingService } from "#/core/geocoding/application/SearchGeocodingService";
import { MusingsCrudService } from "#/core/musings/application/MusingsCrudService";
import { MusingsPublishedQueryService } from "#/core/musings/application/MusingsPublishedQueryService";
import { PlaceService } from "#/core/place/application/PlaceService";
import { ArticleDrizzleAdapter } from "#/infrastructure/article/adapter/ArticleDrizzleAdapter";
import { GoogleIdentityAdapter } from "#/infrastructure/auth/adapter/GoogleIdentityAdapter";
import { JoseSessionTokenAdapter } from "#/infrastructure/auth/adapter/JoseSessionTokenAdapter";
import { NominatimGeocodingAdapter } from "#/infrastructure/geocoding/adapter/NominatimGeocodingAdapter";
import { MusingsDrizzleAdapter } from "#/infrastructure/musings/adapter/MusingsDrizzleAdapter";
import { PlaceDrizzleAdapter } from "#/infrastructure/place/adapter/PlaceDrizzleAdapter";
import { env } from "./env.server";

export const beanConfig: BeanConfig<Beans> = {
	OwnerAuthConfig: (bind) =>
		bind().toConstantValue({
			googleClientId: env.GOOGLE_LOGIN_CLIENT_ID,
			ownerSubject: env.OWNER_SUB,
		}),
	GoogleIdentityPort: (bind) => bind().to(GoogleIdentityAdapter),
	SessionTokenPort: (bind) => bind().to(JoseSessionTokenAdapter),
	VerifyGoogleOwnerUseCase: (bind) => bind().to(AuthService),
	SignOwnerSessionUseCase: (bind) => bind().to(AuthService),
	VerifyOwnerSessionUseCase: (bind) => bind().to(AuthService),
	GeocodingSearchPort: (bind) => bind().to(NominatimGeocodingAdapter),
	SearchGeocodingUseCase: (bind) => bind().to(SearchGeocodingService),
	ArticleCommandPort: (bind) => bind().to(ArticleDrizzleAdapter),
	ArticleQueryPort: (bind) => bind().to(ArticleDrizzleAdapter),
	CreateArticleUseCase: (bind) => bind().to(ArticleCrudService),
	GetArticleUseCase: (bind) => bind().to(ArticleCrudService),
	GetArticleBySlugUseCase: (bind) => bind().to(ArticleCrudService),
	GetNextArticleSeqUseCase: (bind) => bind().to(ArticleCrudService),
	ListArticlesUseCase: (bind) => bind().to(ArticleCrudService),
	ListArticlesByCategoryUseCase: (bind) => bind().to(ArticleCrudService),
	ListPublishedArticlesUseCase: (bind) =>
		bind().to(ArticlePublishedQueryService),
	GetPublishedArticleBySlugUseCase: (bind) =>
		bind().to(ArticlePublishedQueryService),
	GetPublishedArticleNeighborsUseCase: (bind) =>
		bind().to(ArticlePublishedQueryService),
	UpdateArticleUseCase: (bind) => bind().to(ArticleCrudService),
	DeleteArticleUseCase: (bind) => bind().to(ArticleCrudService),
	MusingsCommandPort: (bind) => bind().to(MusingsDrizzleAdapter),
	MusingsQueryPort: (bind) => bind().to(MusingsDrizzleAdapter),
	CreateMusingUseCase: (bind) => bind().to(MusingsCrudService),
	GetMusingUseCase: (bind) => bind().to(MusingsCrudService),
	ListMusingsUseCase: (bind) => bind().to(MusingsCrudService),
	ListPublishedMusingsUseCase: (bind) =>
		bind().to(MusingsPublishedQueryService),
	UpdateMusingUseCase: (bind) => bind().to(MusingsCrudService),
	DeleteMusingUseCase: (bind) => bind().to(MusingsCrudService),
	PlaceCommandPort: (bind) => bind().to(PlaceDrizzleAdapter),
	PlaceQueryPort: (bind) => bind().to(PlaceDrizzleAdapter),
	CreatePlaceUseCase: (bind) => bind().to(PlaceService),
	ListPlacesUseCase: (bind) => bind().to(PlaceService),
	DeletePlaceUseCase: (bind) => bind().to(PlaceService),
};
