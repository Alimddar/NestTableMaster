import { Controller, Post, Get, Patch, Body, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/createTable')
  createTable(@Body('tableName') tableName: string) {
    return this.appService.createTable(tableName);
  }

  @Delete('/removeTable')
  removeTable(@Body('tableName') tableName: string) {
    return this.appService.removeTable(tableName);
  }

  @Post('/addColumn')
  addColumn(
    @Body('tableName') tableName: string,
    @Body('columnDto') columnDto,
  ) {
    return this.appService.addColumn(tableName, columnDto);
  }

  @Delete('/removeColumn')
  removeColumn(
    @Body('tableName') tableName: string,
    @Body('columnName') columnName: string,
  ) {
    return this.appService.removeColumn(tableName, columnName);
  }

  @Post('/addRow')
  addRow(@Body('tableName') tableName: string, @Body('row') row) {
    return this.appService.addRow(tableName, row);
  }

  @Delete('/removeRow')
  removeRow(@Body('tableName') tableName: string, @Body('row') row) {
    return this.appService.removeRow(tableName, row);
  }

  @Patch('/updateRow')
  updateRow(
    @Body('tableName') tableName: string,
    @Body('row') row,
    @Body('newRow') newRow,
  ) {
    return this.appService.updateRow(tableName, row, newRow);
  }

  @Get('/getRows')
  getRows(@Body('tableName') tableName: string) {
    return this.appService.getRows(tableName);
  }

  @Get('/getColumns')
  getColumns(@Body('tableName') tableName: string) {
    return this.appService.getColumns(tableName);
  }

  @Get('/getTables')
  getTables() {
    return this.appService.getTables();
  }
}
