package tinhvomon.com.config;

import java.nio.charset.StandardCharsets;
import java.util.Random;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;

@Component
@ConfigurationProperties(prefix = "vnpay")

public class VnPayConfig {
    public String getTmnCode() {
		return tmnCode;
	}
	public void setTmnCode(String tmnCode) {
		this.tmnCode = tmnCode;
	}
	public String getHashSecret() {
		return hashSecret;
	}
	public void setHashSecret(String hashSecret) {
		this.hashSecret = hashSecret;
	}
	public String getPayUrl() {
		return payUrl;
	}
	public void setPayUrl(String payUrl) {
		this.payUrl = payUrl;
	}
	public String getReturnUrl() {
		return returnUrl;
	}
	public void setReturnUrl(String returnUrl) {
		this.returnUrl = returnUrl;
	}
	private String tmnCode;
    private String hashSecret;
    private String payUrl;
    private String returnUrl;
    public  String hmacSHA512(final String key, final String data) {
        try {

            if (key == null || data == null) {
                throw new NullPointerException();
            }
            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes();
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();

        } catch (Exception ex) {
            return "";
        }
    }
    public String getIpAddress(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-FORWARDED-FOR"); // proxy/ngrok/Cloudflare
        if (ipAddress == null) {
            ipAddress = request.getRemoteAddr(); // trực tiếp từ request
        }
        return ipAddress;
    }
    public  String getRandomNumber(int length) {
        String numbers = "0123456789";
        StringBuilder sb = new StringBuilder(length);
        Random random = new Random();

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(numbers.length());
            sb.append(numbers.charAt(index));
        }

        return sb.toString();
    }
}
