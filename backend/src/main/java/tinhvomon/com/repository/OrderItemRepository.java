package tinhvomon.com.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashSet;

import org.springframework.stereotype.Repository;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;

import tinhvomon.com.db.ConnectDataSource;
import tinhvomon.com.models.FoodItem;
import tinhvomon.com.models.Order;
import tinhvomon.com.models.OrderItems;

@Repository
public class OrderItemRepository implements IRepo<OrderItems> {

	 private SQLServerDataSource sqldts;
	 public OrderItemRepository () {
		 sqldts = ConnectDataSource.getDataSource();
	 }
	@Override
	public OrderItems create(OrderItems e) throws Exception {
		String sql ="insert into OrderItems (order_id,food_id,quantity,unit_price,total_price) values (?,?,?,?,?)";
		try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
			ps.setInt(1, e.getOrder_id());
			ps.setInt(2, e.getFood_id());
			ps.setInt(3, e.getQuantity());
			ps.setDouble(4, e.getUnit_price());
			ps.setDouble(5, e.getTotal_price());	
			  int rows = ps.executeUpdate();
		         System.out.println("Số dòng được chèn vào cơ sở dữ liệu: " + rows);
		         if (rows > 0) {
		             ResultSet keys = ps.getGeneratedKeys();
		             if (keys.next()) {
		                 int id = keys.getInt(1);
		                 e.setId(id);
		                 
		                 System.out.println("ID của bản ghi mới: " + id);
		             }
		             return e;
		         }
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	@Override
	public OrderItems update(OrderItems e) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(int id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public HashSet<OrderItems> getAll() {
		// TODO Auto-generated method stub
		return null;
	}
	

	@Override
	public OrderItems FindById(int id) {
		// TODO Auto-generated method stub
		return null;
	}
	public HashSet<OrderItems> FindByOrderId (int order_id){
		   HashSet<OrderItems> list =new HashSet<OrderItems>();
		String sql = "select * from OrderItems o inner join FoodItems f on o.food_id = f.id where order_id =?";
		
		try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			ps.setInt(1, order_id);
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				OrderItems ord = new OrderItems();
				ord.setId(rs.getInt("id"));
				ord.setOrder_id(order_id);
				ord.setQuantity(rs.getInt("quantity"));
				ord.setTotal_price(rs.getDouble("total_price"));
				ord.setFood_id(rs.getInt("id"));
			    ord.setFood(new FoodItem(rs.getInt("food_id"),rs.getString("name"),0,"",0,rs.getString("image"),true,true));
			   
				list.add(ord);
				
			}
			return list;
			 
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
		
	}

	@Override
	public HashSet<OrderItems> FindByKeywork(String keywork) {
		// TODO Auto-generated method stub
		return null;
	}

}
