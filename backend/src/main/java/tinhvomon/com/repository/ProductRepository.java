package tinhvomon.com.repository;

import tinhvomon.com.models.Product;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;

import tinhvomon.com.models.Product;
import tinhvomon.com.db.ConnectDataSource;

import jakarta.persistence.*;
@Repository
public class ProductRepository {
  private static  ProductRepository _instance = null;
  private SQLServerDataSource sqldts;

  public ProductRepository() {
	  sqldts =  ConnectDataSource.getDataSource();
  }
  public static ProductRepository Instance() {
	  if(_instance==null) {
		  _instance =new ProductRepository();
	  }
	  return _instance;
  }
  
  
  public List<Product> GetAll() 	{
      List<Product> list = new ArrayList<>();
      String sql = "SELECT * FROM Products";

      try (Connection con = sqldts.getConnection();
           Statement stmt = con.createStatement();
           ResultSet rs = stmt.executeQuery(sql)) {

          while (rs.next()) {
              Product p = new Product();
              p.setId(rs.getInt("Index"));
              p.setName(rs.getString("Name"));
              p.setPrice(rs.getDouble("Price"));
              p.setStock(rs.getInt("Stock"));
              list.add(p);
              System.out.print("Rs:" + rs);
          }                     
          System.out.print("Data to show:" + list);

      } catch (SQLException e) {
          e.printStackTrace();
      }
      return list;
  }
 
}
