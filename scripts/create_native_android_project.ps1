$root = 'C:\Users\OM\Desktop\movie-token-native'

$dirs = @(
    'app\src\main\java\com\movietokennative\app\api',
    'app\src\main\java\com\movietokennative\app\model',
    'app\src\main\java\com\movietokennative\app\ui',
    'app\src\main\java\com\movietokennative\app\adapter',
    'app\src\main\java\com\movietokennative\app\data',
    'app\src\main\java\com\movietokennative\app\util',
    'app\src\main\res\layout',
    'app\src\main\res\values',
    'app\src\main\res\drawable',
    'app\src\main\res\drawable-nodpi',
    'app\src\main\res\xml'
)

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force (Join-Path $root $dir) | Out-Null
}

$files = @{
    'settings.gradle' = @'
pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "MovieTokenNative"
include(":app")
'@
    'build.gradle' = @'
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.13.0'
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
'@
    'gradle.properties' = @'
org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.enableJetifier=true
'@
    'local.properties' = @'
sdk.dir=C\:\\Users\\OM\\AppData\\Local\\Android\\Sdk
'@
    'app\build.gradle' = @'
apply plugin: 'com.android.application'

android {
    namespace 'com.movietokennative.app'
    compileSdk 36

    defaultConfig {
        applicationId "com.movietokennative.app"
        minSdk 24
        targetSdk 36
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }

    buildFeatures {
        viewBinding true
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.7.1'
    implementation 'com.google.android.material:material:1.13.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.2.1'
    implementation 'androidx.recyclerview:recyclerview:1.4.0'
    implementation 'androidx.cardview:cardview:1.0.0'
    implementation 'com.squareup.retrofit2:retrofit:2.11.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.11.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.12.0'
    implementation 'com.google.zxing:core:3.5.3'
    implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0'

    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.3.0'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.7.0'
}
'@
    'app\proguard-rules.pro' = ''
    'app\src\main\AndroidManifest.xml' = @'
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:networkSecurityConfig="@xml/network_security_config"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.MovieTokenNative">
        <activity android:name=".ui.TicketActivity" />
        <activity android:name=".ui.PaymentActivity" />
        <activity android:name=".ui.SeatSelectionActivity" />
        <activity android:name=".ui.TimeSlotActivity" />
        <activity android:name=".ui.MovieDetailActivity" />
        <activity android:name=".ui.MovieListActivity" />
        <activity android:name=".ui.RegisterActivity" />
        <activity android:name=".ui.LoginActivity" />
        <activity
            android:name=".ui.MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
'@
    'app\src\main\res\xml\network_security_config.xml' = @'
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true" />
</network-security-config>
'@
    'app\src\main\res\values\strings.xml' = @'
<resources>
    <string name="app_name">Movie Token Native</string>
    <string name="login">Login</string>
    <string name="register">Register</string>
    <string name="book_tickets">Book Tickets</string>
    <string name="pay_now">Pay Now</string>
    <string name="download_ticket">Download Ticket</string>
</resources>
'@
    'app\src\main\res\values\colors.xml' = @'
<resources>
    <color name="red_700">#E50914</color>
    <color name="red_900">#B80710</color>
    <color name="black_900">#101010</color>
    <color name="surface">#F5F5F5</color>
    <color name="surface_card">#FFFFFF</color>
    <color name="text_primary">#181818</color>
    <color name="text_secondary">#717171</color>
    <color name="outline">#DADADA</color>
    <color name="success">#198754</color>
    <color name="warning">#FFB703</color>
    <color name="seat_blue">#2196F3</color>
</resources>
'@
    'app\src\main\res\values\themes.xml' = @'
<resources xmlns:tools="http://schemas.android.com/tools">
    <style name="Theme.MovieTokenNative" parent="Theme.MaterialComponents.DayNight.NoActionBar">
        <item name="colorPrimary">@color/red_700</item>
        <item name="colorPrimaryVariant">@color/red_900</item>
        <item name="colorSecondary">@color/red_700</item>
        <item name="android:statusBarColor">@color/black_900</item>
        <item name="android:navigationBarColor">@color/black_900</item>
        <item name="android:windowLightStatusBar" tools:targetApi="m">false</item>
    </style>
</resources>
'@
    'app\src\main\res\values\styles.xml' = @'
<resources>
    <style name="Theme.MovieTokenNative" parent="Theme.MaterialComponents.DayNight.NoActionBar">
        <item name="colorPrimary">@color/red_700</item>
        <item name="colorPrimaryVariant">@color/red_900</item>
        <item name="colorSecondary">@color/red_700</item>
    </style>
</resources>
'@
    'app\src\main\res\drawable\bg_button_primary.xml' = @'
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
    <corners android:radius="8dp" />
    <solid android:color="@color/red_700" />
</shape>
'@
    'app\src\main\res\drawable\bg_button_outline.xml' = @'
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
    <corners android:radius="8dp" />
    <stroke android:width="1dp" android:color="@color/red_700" />
    <solid android:color="@android:color/transparent" />
</shape>
'@
    'app\src\main\res\drawable\bg_card.xml' = @'
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
    <corners android:radius="8dp" />
    <solid android:color="@color/surface_card" />
    <stroke android:width="1dp" android:color="@color/outline" />
</shape>
'@
    'app\src\main\res\drawable\bg_input.xml' = @'
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
    <corners android:radius="8dp" />
    <solid android:color="@color/surface_card" />
    <stroke android:width="1dp" android:color="@color/outline" />
    <padding android:left="14dp" android:top="12dp" android:right="14dp" android:bottom="12dp" />
</shape>
'@
    'app\src\main\res\drawable\bg_gradient.xml' = @'
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
    <gradient android:startColor="#101010" android:endColor="#39090D" android:angle="270" />
</shape>
'@
    'app\src\main\res\drawable\bg_chip_dark.xml' = @'
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <corners android:radius="6dp" />
    <solid android:color="#272727" />
</shape>
'@
    'app\src\main\res\drawable\bg_chip_selected.xml' = @'
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <corners android:radius="6dp" />
    <solid android:color="@color/surface_card" />
    <stroke android:width="1dp" android:color="@color/red_700" />
</shape>
'@
    'app\src\main\res\drawable\bg_chip_idle.xml' = @'
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <corners android:radius="6dp" />
    <solid android:color="#F7F7F7" />
    <stroke android:width="1dp" android:color="@color/outline" />
</shape>
'@
    'app\src\main\res\drawable\bg_seat_available.xml' = @'
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <corners android:radius="4dp" />
    <solid android:color="#FFFFFF" />
    <stroke android:width="1dp" android:color="@color/success" />
</shape>
'@
    'app\src\main\res\drawable\bg_seat_selected.xml' = @'
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <corners android:radius="4dp" />
    <solid android:color="@color/red_700" />
</shape>
'@
    'app\src\main\res\drawable\bg_seat_booked.xml' = @'
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <corners android:radius="4dp" />
    <solid android:color="#CFCFCF" />
</shape>
'@
    'app\src\main\res\drawable\bg_top_bar.xml' = @'
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <corners android:radius="100dp" />
    <solid android:color="#1E1E1E" />
</shape>
'@
}

foreach ($path in $files.Keys) {
    $fullPath = Join-Path $root $path
    $parent = Split-Path $fullPath -Parent
    New-Item -ItemType Directory -Force $parent | Out-Null
    Set-Content -Path $fullPath -Value $files[$path]
}

$javaFiles = @{
    'app\src\main\java\com\movietokennative\app\model\User.java' = @'
package com.movietokennative.app.model;

public class User {
    public String _id;
    public String name;
    public String mobile;
    public String email;
}
'@
    'app\src\main\java\com\movietokennative\app\model\AuthResponse.java' = @'
package com.movietokennative.app.model;

public class AuthResponse {
    public String message;
    public User user;
    public String token;
}
'@
    'app\src\main\java\com\movietokennative\app\model\SeatResponse.java' = @'
package com.movietokennative.app.model;

import java.util.List;

public class SeatResponse {
    public List<String> bookedSeats;
}
'@
    'app\src\main\java\com\movietokennative\app\model\BookingRequest.java' = @'
package com.movietokennative.app.model;

import java.util.List;

public class BookingRequest {
    public String movie;
    public String time;
    public List<String> seats;
    public int totalPrice;
    public String paymentMethod;
    public String paymentDetails;

    public BookingRequest(String movie, String time, List<String> seats, int totalPrice, String paymentMethod, String paymentDetails) {
        this.movie = movie;
        this.time = time;
        this.seats = seats;
        this.totalPrice = totalPrice;
        this.paymentMethod = paymentMethod;
        this.paymentDetails = paymentDetails;
    }
}
'@
    'app\src\main\java\com\movietokennative\app\model\BookingResponse.java' = @'
package com.movietokennative.app.model;

public class BookingResponse {
    public String message;
    public Ticket ticket;
}
'@
    'app\src\main\java\com\movietokennative\app\model\Ticket.java' = @'
package com.movietokennative.app.model;

import java.util.List;

public class Ticket {
    public String _id;
    public String movie;
    public String time;
    public List<String> seats;
    public String token;
    public int totalPrice;
    public String paymentMethod;
}
'@
    'app\src\main\java\com\movietokennative\app\model\TicketResponse.java' = @'
package com.movietokennative.app.model;

public class TicketResponse {
    public Ticket ticket;
}
'@
    'app\src\main\java\com\movietokennative\app\model\Movie.java' = @'
package com.movietokennative.app.model;

public class Movie {
    private final String id;
    private final String title;
    private final String genre;
    private final String duration;
    private final String certification;
    private final String rating;
    private final String description;
    private final String[] languages;
    private final int posterResId;

    public Movie(String id, String title, String genre, String duration, String certification, String rating, String description, String[] languages, int posterResId) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.duration = duration;
        this.certification = certification;
        this.rating = rating;
        this.description = description;
        this.languages = languages;
        this.posterResId = posterResId;
    }

    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getGenre() { return genre; }
    public String getDuration() { return duration; }
    public String getCertification() { return certification; }
    public String getRating() { return rating; }
    public String getDescription() { return description; }
    public String[] getLanguages() { return languages; }
    public int getPosterResId() { return posterResId; }
}
'@
    'app\src\main\java\com\movietokennative\app\model\SeatItem.java' = @'
package com.movietokennative.app.model;

public class SeatItem {
    private final String label;
    private final boolean booked;
    private boolean selected;
    private final int price;

    public SeatItem(String label, boolean booked, int price) {
        this.label = label;
        this.booked = booked;
        this.price = price;
    }

    public String getLabel() { return label; }
    public boolean isBooked() { return booked; }
    public boolean isSelected() { return selected; }
    public int getPrice() { return price; }
    public void setSelected(boolean selected) { this.selected = selected; }
}
'@
    'app\src\main\java\com\movietokennative\app\api\ApiService.java' = @'
package com.movietokennative.app.api;

import com.movietokennative.app.model.AuthResponse;
import com.movietokennative.app.model.BookingRequest;
import com.movietokennative.app.model.BookingResponse;
import com.movietokennative.app.model.SeatResponse;
import com.movietokennative.app.model.TicketResponse;

import java.util.Map;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface ApiService {
    @POST("api/auth/login")
    Call<AuthResponse> login(@Body Map<String, String> body);

    @POST("api/auth/register")
    Call<AuthResponse> register(@Body Map<String, String> body);

    @GET("api/seats")
    Call<SeatResponse> getBookedSeats(@Query("movie") String movie, @Query("time") String time);

    @POST("api/bookings")
    Call<BookingResponse> createBooking(@Header("Authorization") String authHeader, @Body BookingRequest request);

    @GET("api/tickets/{id}")
    Call<TicketResponse> getTicket(@Header("Authorization") String authHeader, @Path("id") String ticketId);
}
'@
    'app\src\main\java\com\movietokennative\app\api\NetworkClient.java' = @'
package com.movietokennative.app.api;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class NetworkClient {
    private static final String BASE_URL = "http://10.190.217.174:5000/";
    private static ApiService apiService;

    public static ApiService getApiService() {
        if (apiService == null) {
            HttpLoggingInterceptor interceptor = new HttpLoggingInterceptor();
            interceptor.setLevel(HttpLoggingInterceptor.Level.BODY);

            OkHttpClient client = new OkHttpClient.Builder()
                    .addInterceptor(interceptor)
                    .build();

            Retrofit retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .client(client)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();

            apiService = retrofit.create(ApiService.class);
        }
        return apiService;
    }
}
'@
    'app\src\main\java\com\movietokennative\app\data\MovieRepository.java' = @'
package com.movietokennative.app.data;

import com.movietokennative.app.R;
import com.movietokennative.app.model.Movie;

import java.util.ArrayList;
import java.util.List;

public class MovieRepository {
    public static List<Movie> getMovies() {
        List<Movie> movies = new ArrayList<>();
        movies.add(new Movie("DHURANDHAR", "Dhurandhar", "Action", "3h 49m", "U/A", "9.8/10", "An intense action thriller following a fearless officer taking down a dangerous criminal empire.", new String[]{"Hindi", "English", "2D"}, R.drawable.dhurandhar));
        movies.add(new Movie("BORDER_2", "Border 2", "Adventure", "3h 19m", "U/A", "8.7/10", "A patriotic war drama celebrating the bravery and sacrifice of Indian soldiers.", new String[]{"Hindi", "English", "2D"}, R.drawable.border2));
        movies.add(new Movie("RRR", "RRR", "Action", "3h 05m", "U/A", "9.0/10", "An epic action drama about two revolutionaries fighting oppression during British rule.", new String[]{"Hindi", "English", "2D"}, R.drawable.rrr));
        movies.add(new Movie("MAARDANI_3", "Maardani 3", "Thriller", "2h 42m", "U/A", "7.9/10", "A fierce officer takes on a dangerous new criminal threat in a tense thriller.", new String[]{"Hindi", "English", "2D"}, R.drawable.maardani3));
        movies.add(new Movie("IKKIS", "Ikkis", "Action", "2h 26m", "U/A", "8.2/10", "Inspired by real events, this film follows a young soldier's courage and honor.", new String[]{"Hindi", "English", "2D"}, R.drawable.ikkis));
        movies.add(new Movie("KERALA_STORY_2", "The Kerala Story 2", "Drama", "2h 31m", "U/A", "8.5/10", "A hard-hitting drama exploring truth, resilience, and survival.", new String[]{"Hindi", "English", "2D"}, R.drawable.kerala_story2));
        return movies;
    }

    public static Movie getMovieById(String id) {
        for (Movie movie : getMovies()) {
            if (movie.getId().equals(id)) {
                return movie;
            }
        }
        return null;
    }

    public static String[] getShowTimes(String movieId) {
        return new String[]{"10:00 AM", "01:15 PM", "04:30 PM", "07:20 PM", "10:30 PM"};
    }
}
'@
    'app\src\main\java\com\movietokennative\app\util\SessionManager.java' = @'
package com.movietokennative.app.util;

import android.content.Context;
import android.content.SharedPreferences;

public class SessionManager {
    private static final String PREFS = "movie_token_native";
    private static final String KEY_TOKEN = "token";
    private static final String KEY_USER_NAME = "username";
    private static final String KEY_USER_ID = "user_id";

    private final SharedPreferences preferences;

    public SessionManager(Context context) {
        preferences = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
    }

    public void saveSession(String token, String userId, String userName) {
        preferences.edit()
                .putString(KEY_TOKEN, token)
                .putString(KEY_USER_ID, userId)
                .putString(KEY_USER_NAME, userName)
                .apply();
    }

    public String getToken() {
        return preferences.getString(KEY_TOKEN, null);
    }

    public String getUserName() {
        return preferences.getString(KEY_USER_NAME, "Guest");
    }

    public boolean isLoggedIn() {
        String token = getToken();
        return token != null && !token.isEmpty();
    }

    public void clear() {
        preferences.edit().clear().apply();
    }
}
'@
    'app\src\main\java\com\movietokennative\app\util\UiUtil.java' = @'
package com.movietokennative.app.util;

import android.content.Context;
import android.widget.Toast;

public class UiUtil {
    public static void toast(Context context, String message) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
    }
}
'@
}

foreach ($path in $javaFiles.Keys) {
    $fullPath = Join-Path $root $path
    $parent = Split-Path $fullPath -Parent
    New-Item -ItemType Directory -Force $parent | Out-Null
    Set-Content -Path $fullPath -Value $javaFiles[$path]
}

# Remaining larger XML/Java files are appended in a second stage for readability.
