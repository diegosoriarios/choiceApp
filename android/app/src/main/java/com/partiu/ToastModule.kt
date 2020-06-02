package com.partiu

import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.util.*

class ToastModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "ToastExample";
    }

    private val DURATION_SHORT_KEY: String = "SHORT"
    private val DURATION_LONG_KEY: String = "LONG"

    @ReactMethod
    public fun show(message: String, duration: Int) {
        Toast.makeText(reactApplicationContext, message, duration).show()
    }
}