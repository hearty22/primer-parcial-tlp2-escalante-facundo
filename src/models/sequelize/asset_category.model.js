import { DataTypes } from "sequelize";
import { AssetModel } from "./asset.model.js";
import { CategoryModel } from "./category.model.js";
export const AssetCategoryModel = sequelize.define("AssetCategory", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

// TODO: completar relaciones muchos a muchos entre Asset y Category mediante AssetCategory.
// * N:M Asset ↔ Category through AssetCategory
// * 'categories' (Asset) y 'assets' (Category)
// ! FALTA COMPLETAR ACA

AssetModel.belongsToMany(CategoryModel, {
    through: "AssetCategory",
    foreignKey: "Asset_id",
    otherKey: "Category_id",
    as: "categories"
});
CategoryModel.belongsToMany(AssetModel, {
    through: "AssetCategory",
    foreignKey: "Category_id",
    otherKey: "Asset_id",
    as: "assets"
});