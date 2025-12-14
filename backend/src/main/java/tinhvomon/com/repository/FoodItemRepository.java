package tinhvomon.com.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashSet;

import org.springframework.stereotype.Repository;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;

import tinhvomon.com.db.ConnectDataSource;
import tinhvomon.com.models.FoodItem;

@Repository
public class FoodItemRepository implements IRepo<FoodItem>{

	 private SQLServerDataSource sqldts;
	 public FoodItemRepository () {
		 sqldts = ConnectDataSource.getDataSource();
	 }
	 
	 
	 
	 @Override
	 public FoodItem create(FoodItem e) throws Exception {
	     String sql = "INSERT INTO FoodItems (name,type_id,description,price,image,is_vegetarian,is_enabled) VALUES (?,?,?,?,?,?,?)";
	     try (Connection con = sqldts.getConnection();
	          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

	    	 
	    	 
	         ps.setString(1, e.getName());
	         ps.setInt(2, e.getType_id());
	         ps.setString(3, e.getDescription());
	         ps.setDouble(4, e.getPrice());
	         ps.setString(5, e.getImage());
	         ps.setBoolean(6, e.isIs_vegetarian());
	         ps.setBoolean(7, e.isIs_enabled());

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

	     } catch (Exception ex) {
	     throw ex;
	     }

	     return null;
	 }
	 
	 public boolean uploadImage(String url,int id) throws Exception {
		 String sql ="UPDATE FoodItems SET image = ? WHERE id = ? ";
		 
		 try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			 ps.setString(1,url);
			 ps.setInt(2, id);
			 
			  int rows = ps.executeUpdate();
		         System.out.println("Số dòng được chèn vào cơ sở dữ liệu: " + rows);
		         if (rows > 0) {
		       
		             return true;
		         }
			 
			 return false;
		 }
		 catch(Exception e) {
			 throw e;
		 }
	 }

	@Override
	public FoodItem update(FoodItem e) {
		String sql ="update FoodItems set name = ?,type_id=?,description=?, price=?,image=?, is_enabled=? where id =?";
		 try (Connection con = sqldts.getConnection();
		          PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
			 ps.setString(1,e.getName());
			 ps.setInt(2, e.getType_id());
			 ps.setString(3, e.getDescription());		 
			 ps.setDouble(4, e.getPrice());
			 ps.setString(5, e.getImage());
			 ps.setBoolean(6, e.isIs_enabled());
			 ps.setInt(7, e.getId());
			 
			 
			 
			 
			  int rows = ps.executeUpdate();
		         System.out.println("Số dòng được cập nhật vào cơ sở dữ liệu: " + rows);
		         if (rows > 0) {
		       
		             return e;
		         }
			 
			 return null;
		 }
		 catch(Exception ex) {
		 ex.printStackTrace();;
		 }
		return null;
	}

	@Override
	public boolean delete(int id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public HashSet<FoodItem> getAll() {
		// TODO Auto-generated method stub
        System.out.print( "Get all");
	    HashSet<FoodItem> result = new HashSet<>();
		String sql = "SELECT fi.id, fi.name, fi.type_id, fi.description, fi.price, fi.image, " +
	             "fi.is_vegetarian, fi.is_enabled, ft.name AS typeName, ft.slug AS slug " +
	             "FROM FoodItems fi " +
	             "INNER JOIN FoodType ft ON ft.id = fi.type_id";
		try(Connection con = sqldts.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
			  ResultSet rs =	ps.executeQuery();
		        ResultSetMetaData metaData = rs.getMetaData();
		        int columnCount = metaData.getColumnCount();
		        while (rs.next()) {
		            // In tất cả cột trong 1 hàng
		            for (int i = 1; i <= columnCount; i++) {
		                String columnName = metaData.getColumnName(i);
		                Object value = rs.getObject(i);
		                System.out.print(columnName + "=" + value + " | ");
		            }
		            System.out.println( "Type: " +rs.getString("typeName"));

		            // Nếu muốn tạo đối tượng FoodItem từ rs
		            FoodItem item = new FoodItem();
		            item.setId(rs.getInt("id"));
		            item.setName(rs.getString("name"));
		            item.setType_id(rs.getInt("type_id"));
		            item.setDescription(rs.getString("description").trim());
		            item.setPrice(rs.getDouble("price"));
		            item.setImage(rs.getString("image").trim());
		            item.setType_name(rs.getString("typeName").trim());
		            item.setSlug(rs.getString("slug").trim());

		            result.add(item);
		        }

		        return result;
			 
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}

	@Override
	public FoodItem FindById(int id) {
		String sql = "select * from FoodItems  where id= ?";
		try(Connection con = sqldts.getConnection();
	             PreparedStatement ps = con.prepareStatement(sql)){
			ps.setInt(1,id);
			 ResultSet rs =ps.executeQuery();
			 while(rs.next()) {
				 var food =new FoodItem();
				 food.setId(rs.getInt("id"));
				 food.setType_id(rs.getInt("type_id"));
				 food.setDescription(rs.getString("description"));
				 food.setImage(rs.getString("image"));
				 food.setName(rs.getString("name"));
				 food.setPrice(rs.getDouble("price"));
				 food.setIs_enabled(rs.getBoolean("is_enabled"));
				 
				 return food;
			 }
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	@Override
	public HashSet<FoodItem> FindByKeywork(String keywork) {
		// TODO Auto-generated method stub
		return null;
	}

}
