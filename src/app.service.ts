import { Injectable } from '@nestjs/common';
import { ColumnDto } from './dto/column.dto';
import { ApiTags } from '@nestjs/swagger';
import { DataSource } from 'typeorm';

@ApiTags('app')
@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource) {}

  async createTable(tableName) {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
      ${tableName}_id int,
      PRIMARY KEY (${tableName}_id)
    )`;
    await this.dataSource.query(query);
    return `Table ${tableName} created`;
  }

  async removeTable(tableName) {
    const query = `DROP TABLE IF EXISTS ${tableName}`;
    await this.dataSource.query(query);
    return `Table ${tableName} removed`;
  }

  async addColumn(tableName, columnDto: ColumnDto) {
    const query = `ALTER TABLE ${tableName} ADD COLUMN ${columnDto.name} ${columnDto.type}`;
    await this.dataSource.query(query);
    return `Column ${columnDto.name} added to ${tableName}`;
  }

  async removeColumn(tableName, columnName) {
    const query = `ALTER TABLE ${tableName} DROP COLUMN ${columnName}`;
    await this.dataSource.query(query);
    return `Column ${columnName} removed from ${tableName}`;
  }

  async addRow(tableName, row) {
    const columns = Object.keys(row);
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');
    const values = Object.values(row);
    const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
    await this.dataSource.query(query, values);
    return `Row added to ${tableName}`;
  }

  async removeRow(tableName, row) {
    const query = `DELETE FROM ${tableName} WHERE ${Object.keys(row)[0]} = ${Object.values(row)[0]}`;
    await this.dataSource.query(query);
    return `Row removed from ${tableName}`;
  }

  async updateRow(tableName, row, newRow) {
    const setClause = Object.keys(newRow)
      .map((key) => `${key} = ?`)
      .join(', ');
    const whereClause = Object.keys(row)
      .map((key) => `${key} = ?`)
      .join(' AND ');
    const values = [...Object.values(newRow), ...Object.values(row)];
    const query = `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`;
    await this.dataSource.query(query, values);
    return `Row updated in ${tableName}`;
  }

  async getRows(tableName) {
    const query = `SELECT * FROM ${tableName}`;
    const rows = await this.dataSource.query(query);
    return rows;
  }

  async getRow(tableName, row) {
    const query = `SELECT * FROM ${tableName} WHERE ${Object.keys(row)[0]} = ${Object.values(row)[0]}`;
    const rows = await this.dataSource.query(query);
    return rows;
  }

  async getColumns(tableName) {
    const query = `PRAGMA table_info(${tableName})`;
    const columns = await this.dataSource.query(query);
    return columns;
  }

  async getColumn(tableName, columnName) {
    const query = `PRAGMA table_info(${tableName}) WHERE name = ${columnName}`;
    const columns = await this.dataSource.query(query);
    return columns;
  }

  async getTables() {
    const query = `SELECT name FROM sqlite_master WHERE type='table'`;
    const tables = await this.dataSource.query(query);
    return tables;
  }

  async getTable(tableName) {
    const query = `SELECT name FROM sqlite_master WHERE type='table' AND name = ${tableName}`;
    const tables = await this.dataSource.query(query);
    return tables;
  }
}
