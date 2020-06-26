import {Attribute, BelongsTo, HasMany, JsonApiModel, JsonApiModelConfig} from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'mapVersionStatistics'
})
export class MapVersionStatistics extends JsonApiModel {

  @Attribute()
  downloads: number;

  @Attribute()
  plays: number;

  @Attribute()
  draws: number;
}

@JsonApiModelConfig({
  type: 'mapVersion'
})
export class MapVersion extends JsonApiModel {

  @Attribute()
  createTime: Date;

  @Attribute()
  description: string;

  @Attribute()
  downloadUrl: string;

  @Attribute()
  filename: string;

  @Attribute()
  folderName: string;

  @Attribute()
  height: number;

  @Attribute()
  hidden: boolean;

  @Attribute()
  maxPlayers: number;

  @Attribute()
  ranked: boolean;

  @Attribute()
  thumbnailUrlLarge: string;

  @Attribute()
  thumbnailUrlSmall: string;

  @Attribute()
  updateTime: Date;

  @Attribute()
  version: number;

  @Attribute()
  width: number;

  @BelongsTo()
  map: FafMap;

  @BelongsTo()
  statistics: MapVersionStatistics;
}


@JsonApiModelConfig({
  type: 'map'
})
export class FafMap extends JsonApiModel {
  @Attribute()
  averageReviewScore: number;

  @Attribute()
  battleType: string;

  @Attribute()
  createTime: Date;

  @Attribute()
  displayName: string;

  @Attribute()
  mapType: string;

  @Attribute()
  numberOfReviews: number;

  @Attribute()
  updateTime: Date;

  @HasMany()
  versions: MapVersion[];

  @BelongsTo()
  latestVersion: MapVersion;
}
