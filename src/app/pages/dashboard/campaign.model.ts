import {UserModel} from "../../auth/user.model";

export class Campaign{
  private _campaignName: string;
  private _campaignImage: string;
  private _organizationName: string;
  private _goalAmount: number;
  private _status: "Active" | "Suspended" | "Ended";
  private _currentAmount: number;
  private _startDate: Date;
  private _endDate: Date;
  private _leaderboard: UserModel[];
  private _description: string;
  private _id: string;

  constructor(campaignName: string, campaignImage: string, organizationName: string, goalAmount: number,
              status: "Active" | "Suspended" | "Ended", currentAmount: number, startDate: Date, endDate: Date, leaderboard: UserModel[],
              description: string, id: string) {
    this._campaignName = campaignName;
    this._campaignImage = campaignImage;
    this._organizationName = organizationName;
    this._goalAmount = goalAmount;
    this._status = status;
    this._currentAmount = currentAmount;
    this._startDate = startDate;
    this._endDate = endDate;
    this._leaderboard = leaderboard;
    this._description = description;
    this._id = id;
  }

  get campaignName(): string {
    return this._campaignName;
  }

  set campaignName(value: string) {
    this._campaignName = value;
  }

  get campaignImage(): string {
    return this._campaignImage;
  }

  set campaignImage(value: string) {
    this._campaignImage = value;
  }

  get organizationName(): string {
    return this._organizationName;
  }

  set organizationName(value: string) {
    this._organizationName = value;
  }

  get goalAmount(): number {
    return this._goalAmount;
  }

  set goalAmount(value: number) {
    this._goalAmount = value;
  }

  get status(): "Active" | "Suspended" | "Ended" {
    return this._status;
  }

  set status(value: "Active" | "Suspended" | "Ended") {
    this._status = value;
  }

  get currentAmount(): number{
    return this._currentAmount;
  }

  set currentAmount(value: number) {
    this._currentAmount = value;
  }

  get startDate(): Date {
    return this._startDate;
  }

  set startDate(value: Date) {
    this._startDate = value;
  }

  get endDate(): Date {
    return this._endDate;
  }

  set endDate(value: Date) {
    this._endDate = value;
  }

  get leaderboard(): UserModel[] {
    return this._leaderboard;
  }

  set leaderboard(value: UserModel[]) {
    this._leaderboard = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}
