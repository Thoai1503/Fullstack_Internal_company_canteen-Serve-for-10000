package tinhvomon.com.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashSet;

import org.springframework.stereotype.Repository;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;

import tinhvomon.com.db.ConnectDataSource;
import tinhvomon.com.models.CartItem;
import tinhvomon.com.models.FoodItem;

@Repository
public class CartItemRepository implements IRepo<CartItem> {

	 private SQLServerDataSource sqldts;
	 
	 public CartItemRepository() {
		 sqldts = ConnectDataSource.getDataSource();
	 }
	 
	@Override
	public CartItem create(CartItem e) throws Exception {
		String sql = "insert into CartItems (food_id,cart_id,quantity) values (?,?,?)";
		System.out.println("Food: "+e.getFood_id());
		try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			ps.setInt(1, e.getFood_id());
			ps.setInt(2, e.getCart_id());
			ps.setInt(3,e.getQuantity());
			
			
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
			throw ex;
		}
		
		
		return null;
	}

	@Override
	public CartItem update(CartItem e) {
		 String sql ="UPDATE CartItems SET quantity = ? WHERE id = ? ";
		 try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
		   ps.setInt(1, e.getQuantity());
		   ps.setInt(2, e.getId());
			 
			  int rows = ps.executeUpdate();
		         System.out.println("Số dòng được chèn vào cơ sở dữ liệu: " + rows);
		         if (rows > 0) {
		        	   ResultSet keys = ps.getGeneratedKeys();
		             if (keys.next()) {
		                 int id = keys.getInt(1);
		                 e.setId(id);
		                 e.setQuantity(e.getQuantity());
		                 
		                 System.out.println("ID của bản ghi mới: " + id);
		             }
		             return e;
		         }
			 
			 return null;
		 }
		 catch(Exception ex) {
		ex.printStackTrace();
		 }
		 return null;
		 
	
	}

	@Override
	public boolean delete(int id) {
		String sql = "delete CartItems where cart_id = ?";
		try(Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			ps.setInt(1, id);
			  int rows = ps.executeUpdate();
			  if (rows > 0) {
				  return true;
			  }
		}
		catch (Exception ex) {
			ex.printStackTrace();;
		}
		return false;
	}

	@Override
	public HashSet<CartItem> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CartItem FindById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public HashSet<CartItem> FindByKeywork(String keywork) {
		// TODO Auto-generated method stub
		return null;
	}
	public HashSet<CartItem> FindByUserId(int user_id){
		String sql ="select c.user_id, ci.cart_id,ci.quantity,ci.food_id , fi.name,fi.price, fi.is_enabled,fi.image, ci.id as cart_item_id from Carts c inner join CartItems ci on ci.cart_id = c.id inner join FoodItems fi on ci.food_id =fi.id where user_id =?";
		HashSet<CartItem> ciList = new HashSet<CartItem>();
		try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			ps.setInt(1, user_id);
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				CartItem ci = new CartItem();
				ci.setId(rs.getInt("cart_item_id"));
				ci.setCart_id(rs.getInt("cart_id"));
				ci.setFood_id(rs.getInt("food_id"));
				ci.setQuantity(rs.getInt("quantity"));
				ci.setFood(new FoodItem(rs.getInt("food_id"),rs.getString("name"),0,"",rs.getDouble("price"),rs.getString("image"),false,rs.getBoolean("is_enabled")));
				ciList.add(ci);
				
			}
			return ciList;
			
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

}
