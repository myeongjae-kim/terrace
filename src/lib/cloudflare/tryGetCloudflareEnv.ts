declare global {
  interface CloudflareEnv {
    HYPERDRIVE?: {
      connectionString?: string;
    };
  }
}

export const tryGetCloudflareEnv = async (): Promise<CloudflareEnv | null> => {
  try {
    // Cloudflare/OpenNext에서만 존재
    const mod = await import('@opennextjs/cloudflare');
    const { env } = await mod.getCloudflareContext<{ HYPERDRIVE?: string }>({ async: true });
    // env가 없거나 HYPERDRIVE가 없으면 null 처리
    if (!env?.HYPERDRIVE?.connectionString) return null;
    return env as CloudflareEnv;
  } catch {
    // 로컬 dev / Node 런타임에서는 import가 실패할 수 있음
    return null;
  }
};
