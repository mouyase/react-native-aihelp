
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNAIHelpSpec.h"

@interface AIHelp : NSObject <NativeAIHelpSpec>
#else
#import <React/RCTBridgeModule.h>

@interface AIHelp : NSObject <RCTBridgeModule>
#endif

@end
