const TYPES = {
  NextApplication: Symbol.for("NextApplication"),

  AuthService: Symbol.for("AuthService"),
  UserRepository: Symbol.for("UserRepository"),

  BlogArticleRepository: Symbol.for("BlogArticleRepository"),
  BlogArticleService: Symbol.for("BlogArticleService"),

  MusingRepository: Symbol.for("MusingRepository"),
  MusingService: Symbol.for("MusingService"),

  DailyRepository: Symbol.for("DailyRepository"),
  DailyService: Symbol.for("DailyService"),

  CacheRenderingService: Symbol.for("CacheRenderingService"),
};

export { TYPES };