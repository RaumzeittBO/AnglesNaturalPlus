import { PRODUCTS, Product } from "@/content/products";
import {
  INITIAL_COLLECTION_POINTS,
  WASTE_GUIDE,
  INITIAL_PARTNERS,
  INITIAL_EVENTS,
  INITIAL_CHALLENGES,
  INITIAL_REWARDS,
  CollectionPoint,
  WasteItem,
  Partner,
  CollectionEvent,
  SustainabilityChallenge,
  EcoPointReward,
  ImpactRecord,
} from "@/content/circular";

const STORAGE_KEYS = {
  products: "angles_products_v1",
  points: "angles_points_v1",
  wastes: "angles_wastes_v1",
  partners: "angles_partners_v1",
  partnerApplications: "angles_partner_apps_v1",
  events: "angles_events_v1",
  challenges: "angles_challenges_v1",
  rewards: "angles_rewards_v1",
  impactRecords: "angles_impact_records_v1",
  ecoTransactions: "angles_eco_tx_v1",
};

export { type ImpactRecord };

export interface EcoTransaction {
  id: string;
  userId: string;
  userEmail: string;
  points: number;
  type: "RETURN_CONTAINER" | "EVENT_PARTICIPATION" | "CHALLENGE" | "MANUAL_ADMIN" | "REWARD_REDEMPTION";
  reason: string;
  createdAt: string;
  status: "CONFIRMED" | "PENDING";
}

class DataAdapter {
  private isClient = typeof window !== "undefined";

  private getStored<T>(key: string, defaultData: T): T {
    if (!this.isClient) return defaultData;
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultData;
    } catch {
      return defaultData;
    }
  }

  private setStored<T>(key: string, data: T) {
    if (!this.isClient) return;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {}
  }

  // --- PRODUCTS ---
  public getProducts(): Product[] {
    return this.getStored<Product[]>(STORAGE_KEYS.products, PRODUCTS);
  }

  public getProductBySlug(slug: string): Product | undefined {
    return this.getProducts().find((p) => p.slug === slug);
  }

  public saveProduct(product: Product): void {
    const list = this.getProducts();
    const idx = list.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      list[idx] = product;
    } else {
      list.push(product);
    }
    this.setStored(STORAGE_KEYS.products, list);
  }

  public deleteProduct(id: string): void {
    const list = this.getProducts().filter((p) => p.id !== id);
    this.setStored(STORAGE_KEYS.products, list);
  }

  // --- COLLECTION POINTS ---
  public getCollectionPoints(): CollectionPoint[] {
    return this.getStored<CollectionPoint[]>(STORAGE_KEYS.points, INITIAL_COLLECTION_POINTS);
  }

  public saveCollectionPoint(point: CollectionPoint): void {
    const list = this.getCollectionPoints();
    const idx = list.findIndex((p) => p.id === point.id);
    if (idx >= 0) {
      list[idx] = point;
    } else {
      list.push(point);
    }
    this.setStored(STORAGE_KEYS.points, list);
  }

  public deleteCollectionPoint(id: string): void {
    const list = this.getCollectionPoints().filter((p) => p.id !== id);
    this.setStored(STORAGE_KEYS.points, list);
  }

  // --- WASTE GUIDE ---
  public getWasteItems(): WasteItem[] {
    return this.getStored<WasteItem[]>(STORAGE_KEYS.wastes, WASTE_GUIDE);
  }

  public saveWasteItem(item: WasteItem): void {
    const list = this.getWasteItems();
    const idx = list.findIndex((w) => w.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.push(item);
    }
    this.setStored(STORAGE_KEYS.wastes, list);
  }

  public deleteWasteItem(id: string): void {
    const list = this.getWasteItems().filter((w) => w.id !== id);
    this.setStored(STORAGE_KEYS.wastes, list);
  }

  // --- PARTNERS ---
  public getPartners(): Partner[] {
    return this.getStored<Partner[]>(STORAGE_KEYS.partners, INITIAL_PARTNERS);
  }

  public getPartnerBySlug(slug: string): Partner | undefined {
    return this.getPartners().find((p) => p.slug === slug || p.id === slug);
  }

  public savePartner(partner: Partner): void {
    const list = this.getPartners();
    const idx = list.findIndex((p) => p.id === partner.id);
    if (idx >= 0) {
      list[idx] = partner;
    } else {
      list.push(partner);
    }
    this.setStored(STORAGE_KEYS.partners, list);
  }

  public deletePartner(id: string): void {
    const list = this.getPartners().filter((p) => p.id !== id);
    this.setStored(STORAGE_KEYS.partners, list);
  }

  // --- PARTNER APPLICATIONS ---
  public getPartnerApplications(): Partner[] {
    return this.getStored<Partner[]>(STORAGE_KEYS.partnerApplications, []);
  }

  public submitPartnerApplication(app: Omit<Partner, "id" | "joinedDate" | "status">): Partner {
    const apps = this.getPartnerApplications();
    const newPartner: Partner = {
      ...app,
      id: `app-${Date.now()}`,
      status: "PENDING",
      joinedDate: new Date().toISOString().split("T")[0],
    };
    apps.push(newPartner);
    this.setStored(STORAGE_KEYS.partnerApplications, apps);
    return newPartner;
  }

  public updateApplicationStatus(id: string, status: "APPROVED" | "REJECTED"): void {
    const apps = this.getPartnerApplications();
    const target = apps.find((a) => a.id === id);
    if (target) {
      target.status = status;
      this.setStored(STORAGE_KEYS.partnerApplications, apps);
      if (status === "APPROVED") {
        this.savePartner(target);
      }
    }
  }

  // --- JORNADAS / EVENTS ---
  public getEvents(): CollectionEvent[] {
    return this.getStored<CollectionEvent[]>(STORAGE_KEYS.events, INITIAL_EVENTS);
  }

  public saveEvent(event: CollectionEvent): void {
    const list = this.getEvents();
    const idx = list.findIndex((e) => e.id === event.id);
    if (idx >= 0) {
      list[idx] = event;
    } else {
      list.push(event);
    }
    this.setStored(STORAGE_KEYS.events, list);

    if (event.results && (event.status === "COMPLETED" || event.status === "completed")) {
      this.addImpactRecord({
        id: `impact-event-${event.id}`,
        date: event.date,
        eventNameOrSource: event.title,
        material: "Material mixto recuperado en jornada",
        kgCollected: event.results.kgCollected,
        weightKg: event.results.kgCollected,
        containersCollected: event.results.containersCollected,
        unitsCount: event.results.containersCollected,
        participants: event.results.participants,
        registeredBy: "Coordinación Angles Circular",
      });
    }
  }

  public deleteEvent(id: string): void {
    const list = this.getEvents().filter((e) => e.id !== id);
    this.setStored(STORAGE_KEYS.events, list);
  }

  // --- IMPACT RECORDS & TOTALS ---
  public getImpactRecords(): ImpactRecord[] {
    return this.getStored<ImpactRecord[]>(STORAGE_KEYS.impactRecords, []);
  }

  public addImpactRecord(record: ImpactRecord): void {
    const records = this.getImpactRecords();
    const idx = records.findIndex((r) => r.id === record.id);
    if (idx >= 0) {
      records[idx] = record;
    } else {
      records.unshift(record);
    }
    this.setStored(STORAGE_KEYS.impactRecords, records);
  }

  public saveImpactRecord(record: ImpactRecord): void {
    this.addImpactRecord(record);
  }

  public getImpactTotals() {
    const records = this.getImpactRecords();
    const partners = this.getPartners();
    const events = this.getEvents();

    const activePartners = partners.filter((p) => p.status === "APPROVED" || p.status === "approved" || p.verified).length;
    const completedEvents = events.filter((e) => e.status === "COMPLETED" || e.status === "completed").length;

    const totalKg = records.reduce((acc, curr) => acc + (curr.kgCollected || curr.weightKg || 0), 0);
    const totalContainers = records.reduce((acc, curr) => acc + (curr.containersCollected || curr.unitsCount || 0), 0);
    const totalParticipants = records.reduce((acc, curr) => acc + (curr.participants || 0), 0);
    const totalCo2Saved = records.reduce((acc, curr) => acc + (curr.co2SavedKg || (curr.kgCollected || curr.weightKg || 0) * 0.7), 0);

    return {
      totalKg,
      totalKgDiverted: Math.round(totalKg * 10) / 10,
      totalContainers,
      totalContainersRecovered: totalContainers,
      totalPackagesRecovered: totalContainers,
      totalParticipants,
      activeVolunteers: totalParticipants,
      totalCo2SavedKg: Math.round(totalCo2Saved * 10) / 10,
      totalCo2eAvoidedKg: Math.round(totalCo2Saved * 10) / 10,
      activePartners,
      verifiedPartners: activePartners,
      activePoints: this.getCollectionPoints().filter((p) => p.status === "ACTIVE" || p.status === "active").length,
      completedEvents,
      recordsCount: records.length,
    };
  }

  // --- CHALLENGES ---
  public getChallenges(): SustainabilityChallenge[] {
    return this.getStored<SustainabilityChallenge[]>(STORAGE_KEYS.challenges, INITIAL_CHALLENGES);
  }

  public saveChallenge(challenge: SustainabilityChallenge): void {
    const list = this.getChallenges();
    const idx = list.findIndex((c) => c.id === challenge.id);
    if (idx >= 0) {
      list[idx] = challenge;
    } else {
      list.push(challenge);
    }
    this.setStored(STORAGE_KEYS.challenges, list);
  }

  public deleteChallenge(id: string): void {
    const list = this.getChallenges().filter((c) => c.id !== id);
    this.setStored(STORAGE_KEYS.challenges, list);
  }

  // --- REWARDS ---
  public getRewards(): EcoPointReward[] {
    return this.getStored<EcoPointReward[]>(STORAGE_KEYS.rewards, INITIAL_REWARDS);
  }

  public saveReward(reward: EcoPointReward): void {
    const list = this.getRewards();
    const idx = list.findIndex((r) => r.id === reward.id);
    if (idx >= 0) {
      list[idx] = reward;
    } else {
      list.push(reward);
    }
    this.setStored(STORAGE_KEYS.rewards, list);
  }

  public deleteReward(id: string): void {
    const list = this.getRewards().filter((r) => r.id !== id);
    this.setStored(STORAGE_KEYS.rewards, list);
  }

  // --- ECO-POINTS TRANSACTIONS ---
  public getEcoTransactions(): EcoTransaction[] {
    return this.getStored<EcoTransaction[]>(STORAGE_KEYS.ecoTransactions, []);
  }

  public addEcoTransaction(tx: Omit<EcoTransaction, "id" | "createdAt">): EcoTransaction {
    const list = this.getEcoTransactions();
    const newTx: EcoTransaction = {
      ...tx,
      id: `tx-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    list.unshift(newTx);
    this.setStored(STORAGE_KEYS.ecoTransactions, list);
    return newTx;
  }

  public getUserBalance(userId: string): number {
    const txs = this.getEcoTransactions().filter((t) => t.userId === userId && t.status === "CONFIRMED");
    return txs.reduce((sum, curr) => sum + curr.points, 0);
  }
}

export const dbAdapter = new DataAdapter();