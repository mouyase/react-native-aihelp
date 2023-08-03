package com.aihelp;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import net.aihelp.config.ApiConfig;
import net.aihelp.config.UserConfig;
import net.aihelp.config.enums.PublishCountryOrRegion;
import net.aihelp.init.AIHelpSupport;

import java.util.HashMap;
import java.util.Map;

@ReactModule(name = AIHelpModule.NAME)
public class AIHelpModule extends ReactContextBaseJavaModule {
  public static final String NAME = "AIHelp";

  public AIHelpModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put("COUNTRY_OR_REGION_CN", String.valueOf(PublishCountryOrRegion.CN));
    constants.put("COUNTRY_OR_REGION_IN", String.valueOf(PublishCountryOrRegion.IN));
    return constants;
  }

  @ReactMethod
  public void additionalSupportFor(String countryOrRegion) {
    if (countryOrRegion.contains(String.valueOf(PublishCountryOrRegion.CN))) {
      AIHelpSupport.additionalSupportFor(PublishCountryOrRegion.CN);
    } else if (countryOrRegion.contains(String.valueOf(PublishCountryOrRegion.IN))) {
      AIHelpSupport.additionalSupportFor(PublishCountryOrRegion.IN);
    }
  }

  @ReactMethod
  public void init(String appKey, String domain, String appId, String language, Promise promise) {
    if (language.equals("SYSTEM")) {
      AIHelpSupport.init(getReactApplicationContext(), appKey, domain, appId);
    } else {
      AIHelpSupport.init(getReactApplicationContext(), appKey, domain, appId, language);
    }
    AIHelpSupport.setOnAIHelpInitializedCallback((isSuccess, message) -> {
      if (isSuccess) {
        promise.resolve(null);
      } else {
        promise.reject(new Throwable(message));
      }
    });
  }

  @ReactMethod
  public void show(String entranceId, String welcomeMessage) {
    if (welcomeMessage.equals("NONE")) {
      AIHelpSupport.show(entranceId);
    } else {
      ApiConfig apiConfig = new ApiConfig.Builder().setEntranceId(entranceId).setWelcomeMessage(welcomeMessage).build();
      AIHelpSupport.show(apiConfig);
    }
  }

  @ReactMethod
  public void updateSDKLanguage(String language) {
    AIHelpSupport.updateSDKLanguage(language);
  }

  @ReactMethod
  public void updateUserInfo(String userId, String userName, String serverId, String userTags, String customData) {
    UserConfig.Builder builder = new UserConfig.Builder();
    if (!userId.equals("NONE")) {
      builder.setUserId(userId);
    }
    if (!userName.equals("NONE")) {
      builder.setUserName(userName);
    }
    if (!serverId.equals("NONE")) {
      builder.setServerId(serverId);
    }
    if (!userTags.equals("NONE")) {
      builder.setUserTags(userTags);
    }
    if (!customData.equals("NONE")) {
      builder.setCustomData(customData);
    }
    UserConfig userConfig = builder.build();
    AIHelpSupport.updateUserInfo(userConfig);
  }

  public void resetUserInfo() {
    AIHelpSupport.resetUserInfo();
  }
}

