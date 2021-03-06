class DummyDB implements TPCCDatabase {

  getName() {return 'DummyDB';}
  constructor(logger: any) {}

  nullDBResponseTime: number = 0*1000; /* in milliseconds; Response time of the database that doesn't do anything */

  doNewOrderTransaction(input: NewOrder, callback: (status: string, output: NewOrder) => void) {

    var response = function(){

      /* Populate the output fields of the order with dummy data */
      input.o_id        = 9999;
      input.o_entry_d   = new Date();
      input.w_tax       = 0.10;
      input.d_tax       = 0.15;
      input.d_next_o_id = 2009;
      input.c_last      = 'Singh';
      input.c_credit    = 'GC';
      input.c_discount  = 0.40;
      input.total_amount= 800;

      var i: number;
      input.o_ol_cnt = 0;

      for (i = 0; i < 15; ++i) {
        if (input.order_lines[i].ol_i_id !== -1 ) {
          ++input.o_ol_cnt;

          input.order_lines[i].i_price = 9;
          input.order_lines[i].i_name = 'Item X';
          input.order_lines[i].i_data = 'Item Data';
          input.order_lines[i].s_quantity = 99999;
          input.order_lines[i].brand_generic = 'B';
          input.order_lines[i].ol_amount = 99;
        }
      }

      if (Math.random() < 0.01) {
        callback('Item number is not valid', input);
      } else {
        callback('Success', input);
      }
    };

    if (nullDBResponseTime > 0) {
      setTimeout(response, nullDBResponseTime);
    } else {
      response();
    }

  }

  /* TODO: Implement the "Dummy" Payment transaction here */
  doPaymentTransaction(input: Payment, callback: (status: string, output: Payment) => void) {
    if (nullDBResponseTime > 0) {
      setTimeout(function(){
        callback('Success', input);
        }, nullDBResponseTime);
    } else {
      callback('Success', input);
    }
  }

  /* TODO: Implement the "Dummy" Delivery transaction here */
  doDeliveryTransaction(input: Delivery, callback: (status: string, output: Delivery) => void) {
    if (nullDBResponseTime > 0) {
      setTimeout(function(){
        callback('Success', input);
        }, nullDBResponseTime);
    } else {
      callback('Success', input);
    }
  }

  /* TODO: Implement the "Dummy" OrderStatus transaction here */
  doOrderStatusTransaction(input: OrderStatus, callback: (status: string, output: OrderStatus) => void): void {
    if (nullDBResponseTime > 0) {
      setTimeout(function(){
        callback('Success', input);
        }, nullDBResponseTime);
    } else {
      callback('Success', input);
    }
  }

  /* TODO: Implement the "Dummy" StckLevel transaction here */
  doStockLevelTransaction(input: StockLevel, callback: (status: string, output: StockLevel) => void): void {
    if (nullDBResponseTime > 0) {
      setTimeout(function(){
        callback('Success', input);
        }, nullDBResponseTime);
    } else {
      callback('Success', input);
    }
  }
}

/*
 * The infinitely fast database, as described in comment of Clause 4.1.3
 */
class NullDB implements TPCCDatabase {

  getName() {return 'NullDB';}

  constructor(logger: any) {}

  doNewOrderTransaction(input: NewOrder, callback: (status: string, output: NewOrder) => void): void {
    callback('Success', input);
  }

  doPaymentTransaction(input: Payment, callback: (status: string, output: Payment) => void): void {
    callback('Success', input);
  }

  doDeliveryTransaction(input: Delivery, callback: (status: string, output: Delivery) => void): void {
    callback('Success', input);
  }

  doOrderStatusTransaction(input: OrderStatus, callback: (status: string, output: OrderStatus) => void): void {
    callback('Success', input);
  }

  doStockLevelTransaction(input: StockLevel, callback: (status: string, output: StockLevel) => void): void {
    callback('Success', input);
  }
}
