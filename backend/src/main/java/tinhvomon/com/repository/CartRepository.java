package tinhvomon.com.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashSet;

import org.springframework.stereotype.Repository;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;

import tinhvomon.com.db.ConnectDataSource;
import tinhvomon.com.models.Cart;


@Repository
public class CartRepository implements IRepo<Cart> {

	
	 private SQLServerDataSource sqldts;
	 
	 public CartRepository() {
		 sqldts = ConnectDataSource.getDataSource();
	 }
	 
	@Override
	public Cart create(Cart e) throws Exception {
	String sql = "insert into Carts (user_id) values (?)";
		
		try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			ps.setInt(1, e.getUser_id());
			
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
	public Cart update(Cart e) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(int id) {
		String sql = "delete Carts where id = ?";
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
	public HashSet<Cart> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Cart FindById(int id) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public Cart FindbyUserId(int user_id) {
		String sql = "select * from Carts where user_id = ?";
		try(Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			ps.setInt(1, user_id);
			
			  ResultSet rs =	ps.executeQuery();
			while (rs.next()) {
				Cart cart = new Cart();
				cart.setId(rs.getInt("id"));
		       cart.setUser_id(user_id);
		       
		       return cart;
			}
			  
			return null;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			
		}
		return null;
	}

	@Override
	public HashSet<Cart> FindByKeywork(String keywork) {
		// TODO Auto-generated method stub
		return null;
	}

}
