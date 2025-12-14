 package tinhvomon.com.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;

import tinhvomon.com.db.ConnectDataSource;
import tinhvomon.com.models.User;


@Repository
public class UserRepo  {
	  private SQLServerDataSource sqldts;
	
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
   public UserRepo() {
	   sqldts =  ConnectDataSource.getDataSource();
   }
   
   public boolean checkBasicAuth(String email,String password) {
	   System.out.println("Check email basic auth: "+ email);
       String sql = "SELECT * FROM Users WHERE email = ?";

	   
	   try (Connection con = sqldts.getConnection();
            PreparedStatement ps = con.prepareStatement(sql)){
		   ps.setString(1,email);
           ResultSet rs = ps.executeQuery();
           if(rs.next()) {
        	   System.out.println("Zô");
        	   var user= new User(rs.getInt("id"),rs.getString("email"),rs.getString("password"),"user");
        	     System.out.println("Password = " + user.getPassword());
        	   if(!encoder.matches(password, user.getPassword().trim())) return false;
        	   return true;
           }
	   }
	   catch(SQLException e) {
	   
		   e.printStackTrace();
	   }	   
	   return false;

   }
   
   public User getUserByEmail(String email) {

	   
	   System.out.println("Check email repo: "+ email);
       String sql = "SELECT * FROM Users WHERE email = ?";

	   
	   try (Connection con = sqldts.getConnection();
            PreparedStatement ps = con.prepareStatement(sql)){
		   ps.setString(1,email);
           ResultSet rs = ps.executeQuery();
           if(rs.next()) {
        	   System.out.println("Has next: "+ "có");
        	   return new User(rs.getInt("id"),rs.getString("email"),rs.getString("password"),"user");
           }
	   }
	   catch(SQLException e) {
	   
		   e.printStackTrace();
	   }	   
	   return null;

   }
   public User findUserByEmail(String email) {
	   String sql = "SELECT * FROM Users WHERE email = ?";

	   
	   try (Connection con = sqldts.getConnection();
            PreparedStatement ps = con.prepareStatement(sql)){
		   ps.setString(1,email);
           ResultSet rs = ps.executeQuery();
           if(rs.next()) {//rs.getString("role")
        	   System.out.println("Role: "+rs.getString("role") );
        	   var user =  new User(rs.getInt("id"),rs.getString("email"),rs.getString("password"),rs.getString("role"));
        	   user.setRole(rs.getString("role"));
        	   return user;
           }
	   }
	   catch(SQLException e) {
	   
		   e.printStackTrace();
	   }	   
	   return null;
   }
   
   public boolean isExistEmail (String email) {
	   String sql = "SELECT * FROM Users WHERE email = ?";
	   try (Connection con = sqldts.getConnection();
			 PreparedStatement ps = con.prepareStatement(sql);
          ){
		   ps.setString(1, email);
		   ResultSet rs = ps.executeQuery();
		   
		   if(rs.next()) {
			   
			   return true;
		   }
		   return false;
	   }
	   catch (SQLException e) {
		   e.printStackTrace();
	   }
	  return false;
   }
   
   public User createNewUser (User user) {
	   var isExist = isExistEmail(user.getEmail());
	   System.out.println("Is Exist: "+isExist );
	   
	   if(isExist) return null;
	   
	   String sql ="INSERT INTO Users (email,password,role) VALUES (?,?,?)";
	   
	   try(Connection con = sqldts.getConnection();
			   PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)
			   ){
		  String hashPassword = encoder.encode(user.getPassword().trim());
		   ps.setString(1, user.getEmail());
		   ps.setString(2, hashPassword);
		   ps.setString(3, user.getRole());
		   int rows = ps.executeUpdate();
		   System.out.println("Row: "+rows);
		   
		   if(rows>0) {
			   
			   ResultSet keys =ps.getGeneratedKeys();
			   System.out.println("Key: "+keys);
			  
			   return user;
			   
		   }
		//   return user;
	   }
	   catch(SQLException e) {
		   e.printStackTrace();
	   }
	   
	return null;
	   
	
   }
   
}
