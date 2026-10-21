-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "subscription_tier" AS ENUM ('essential', 'premium');

-- CreateEnum
CREATE TYPE "subscription_status" AS ENUM ('pending', 'active', 'past_due', 'cancelled', 'expired');

-- CreateEnum
CREATE TYPE "payment_status" AS ENUM ('created', 'authorized', 'captured', 'failed', 'refunded');

-- CreateEnum
CREATE TYPE "property_type" AS ENUM ('residential_flat', 'residential_house', 'commercial', 'plot', 'other');

-- CreateEnum
CREATE TYPE "listing_status" AS ENUM ('draft', 'pending_verification', 'teaser', 'member_available', 'auction_approaching', 'auction_completed', 'withdrawn_postponed', 'recheck_required');

-- CreateEnum
CREATE TYPE "possession_status" AS ENUM ('vacant', 'occupied', 'third_party', 'unknown');

-- CreateEnum
CREATE TYPE "evidence_label" AS ENUM ('verified_source', 'advocate_reviewed', 'first_hand', 'third_party', 'pending_verification', 'unknown');

-- CreateEnum
CREATE TYPE "risk_indicator" AS ENUM ('price_attractiveness', 'document_completeness', 'possession', 'dues', 'inspection', 'legal_questions', 'data_freshness');

-- CreateEnum
CREATE TYPE "contribution_type" AS ENUM ('inspection_experience', 'document_question', 'reported_dues', 'building_condition', 'valuation', 'auction_process', 'advocate_question', 'other');

-- CreateEnum
CREATE TYPE "inspection_status" AS ENUM ('requested', 'confirmed', 'completed', 'cancelled', 'declined');

-- CreateEnum
CREATE TYPE "simulation_difficulty" AS ENUM ('beginner', 'intermediate', 'advanced');

-- CreateEnum
CREATE TYPE "report_status" AS ENUM ('open', 'resolved', 'dismissed');

-- CreateEnum
CREATE TYPE "source_type" AS ENUM ('sarfaesi_notice', 'drt_order', 'bank_website', 'auction_portal', 'public_notice', 'direct_intake', 'other');

-- CreateEnum
CREATE TYPE "notification_type" AS ENUM ('account_created', 'email_verified', 'password_reset', 'payment_succeeded', 'payment_failed', 'subscription_renewing_soon', 'subscription_cancelled', 'subscription_expired', 'new_matching_listing', 'auction_date_changed', 'emd_deadline_approaching', 'new_document_available', 'forum_reply', 'forum_followed_thread', 'inspection_status_changed', 'inspection_reminder', 'enquiry_response', 'advocate_enquiry_status', 'report_outcome', 'listing_recheck_flagged');

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT,
    "role" "user_role" NOT NULL DEFAULT 'user',
    "gstin" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "tier" "subscription_tier" NOT NULL,
    "status" "subscription_status" NOT NULL,
    "razorpay_subscription_id" TEXT NOT NULL,
    "current_period_start" TIMESTAMPTZ(6) NOT NULL,
    "current_period_end" TIMESTAMPTZ(6) NOT NULL,
    "auto_renew" BOOLEAN NOT NULL DEFAULT true,
    "cancelled_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "subscription_id" UUID,
    "razorpay_payment_id" TEXT NOT NULL,
    "razorpay_order_id" TEXT,
    "amount_inr" BIGINT NOT NULL,
    "gst_amount_inr" BIGINT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" "payment_status" NOT NULL,
    "invoice_number" TEXT,
    "method" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "reference_code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "property_type" "property_type" NOT NULL,
    "configuration" TEXT,
    "description" TEXT,
    "carpet_area_sqft" DECIMAL(10,2),
    "built_up_area_sqft" DECIMAL(10,2),
    "reserve_price_inr" BIGINT NOT NULL,
    "emd_amount_inr" BIGINT,
    "emd_deadline" TIMESTAMPTZ(6),
    "auction_date" DATE,
    "auction_time" TIME(6),
    "auction_authority" TEXT,
    "official_source_ref" TEXT,
    "source_type" "source_type",
    "source_reference" TEXT,
    "source_captured_at" TIMESTAMPTZ(6),
    "verified_by" UUID,
    "last_verified_at" TIMESTAMPTZ(6),
    "recheck_due_at" TIMESTAMPTZ(6),
    "second_reviewer_id" UUID,
    "general_location" TEXT NOT NULL,
    "exact_location" TEXT,
    "building_name" TEXT,
    "society_name" TEXT,
    "possession_status" "possession_status" NOT NULL DEFAULT 'unknown',
    "possession_source" TEXT,
    "reported_dues_inr" BIGINT,
    "dues_verification_status" "evidence_label" NOT NULL DEFAULT 'unknown',
    "inspection_available" BOOLEAN NOT NULL DEFAULT false,
    "listing_status" "listing_status" NOT NULL DEFAULT 'draft',
    "published_at" TIMESTAMPTZ(6),
    "created_by" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_photos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "property_id" UUID NOT NULL,
    "storage_path" TEXT NOT NULL,
    "caption" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_documents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "property_id" UUID NOT NULL,
    "doc_type" TEXT NOT NULL,
    "storage_path" TEXT NOT NULL,
    "is_member_accessible" BOOLEAN NOT NULL DEFAULT true,
    "uploaded_by" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_status_history" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "property_id" UUID NOT NULL,
    "from_status" "listing_status" NOT NULL,
    "to_status" "listing_status" NOT NULL,
    "changed_by" UUID NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_status_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_risk_indicators" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "property_id" UUID NOT NULL,
    "indicator" "risk_indicator" NOT NULL,
    "evidence_label" "evidence_label" NOT NULL,
    "value_text" TEXT,
    "note" TEXT,
    "updated_by" UUID NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_risk_indicators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forum_posts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "property_id" UUID NOT NULL,
    "author_id" UUID NOT NULL,
    "parent_id" UUID,
    "contribution_type" "contribution_type" NOT NULL,
    "body" TEXT NOT NULL,
    "is_helpful_answer" BOOLEAN NOT NULL DEFAULT false,
    "upvote_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edited_at" TIMESTAMPTZ(6),
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "forum_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forum_votes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "post_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "forum_votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forum_follows" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "forum_follows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forum_reports" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "post_id" UUID NOT NULL,
    "reporter_id" UUID NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "report_status" NOT NULL DEFAULT 'open',
    "resolved_by" UUID,
    "resolved_at" TIMESTAMPTZ(6),
    "resolution_note" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "forum_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watchlists" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "watchlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspections" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "property_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "preferred_dates" JSONB NOT NULL,
    "status" "inspection_status" NOT NULL DEFAULT 'requested',
    "confirmed_date" TIMESTAMPTZ(6),
    "notes" TEXT,
    "admin_note" TEXT,
    "consent_at" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inspections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advocate_enquiries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "question" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'received',
    "fee_disclosure" JSONB NOT NULL,
    "consent_at" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "advocate_enquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "type" "notification_type" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "link" TEXT,
    "read_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulation_sessions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "session_id" TEXT,
    "scenario_key" TEXT NOT NULL,
    "difficulty" "simulation_difficulty" NOT NULL,
    "budget_inr" BIGINT NOT NULL,
    "outcome" TEXT NOT NULL,
    "final_bid_inr" BIGINT,
    "report" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "simulation_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cost_calculations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "property_id" UUID,
    "inputs" JSONB NOT NULL,
    "outputs" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cost_calculations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "body_markdown" TEXT NOT NULL,
    "hero_image_path" TEXT,
    "category" TEXT NOT NULL,
    "difficulty_level" TEXT,
    "estimated_read_minutes" INTEGER NOT NULL DEFAULT 5,
    "published_at" TIMESTAMPTZ(6),
    "created_by" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quizzes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "passing_score" INTEGER NOT NULL DEFAULT 70,
    "related_article_id" UUID,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_by" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_questions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "quiz_id" UUID NOT NULL,
    "question_text" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "correct_option_key" TEXT NOT NULL,
    "explanation" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_attempts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "quiz_id" UUID NOT NULL,
    "user_id" UUID,
    "session_id" TEXT,
    "score" INTEGER NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "answers" JSONB NOT NULL,
    "started_at" TIMESTAMPTZ(6) NOT NULL,
    "completed_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "quiz_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "badges" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon_key" TEXT NOT NULL,
    "criteria" JSONB NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_badges" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "badge_id" UUID NOT NULL,
    "awarded_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_progress" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "article_id" UUID,
    "quiz_id" UUID,
    "progress_pct" INTEGER NOT NULL DEFAULT 0,
    "last_viewed_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMPTZ(6),

    CONSTRAINT "learning_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_enquiries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "property_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "subject" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "assigned_admin_id" UUID,
    "opened_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closed_at" TIMESTAMPTZ(6),

    CONSTRAINT "property_enquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_enquiry_messages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "enquiry_id" UUID NOT NULL,
    "author_id" UUID NOT NULL,
    "author_role" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_enquiry_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "invoice_number" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "subscription_id" UUID NOT NULL,
    "payment_id" UUID NOT NULL,
    "gstin" TEXT,
    "customer_gstin" TEXT,
    "place_of_supply" TEXT NOT NULL,
    "taxable_value_inr" BIGINT NOT NULL,
    "gst_rate" DECIMAL(5,2) NOT NULL,
    "gst_amount_inr" BIGINT NOT NULL,
    "total_amount_inr" BIGINT NOT NULL,
    "description" TEXT NOT NULL,
    "issued_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pdf_path" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'issued',
    "void_reason" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webhook_events" (
    "razorpay_event_id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "payload_hash" TEXT NOT NULL,
    "received_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed_at" TIMESTAMPTZ(6),
    "status" TEXT NOT NULL DEFAULT 'received',
    "error" TEXT,

    CONSTRAINT "webhook_events_pkey" PRIMARY KEY ("razorpay_event_id")
);

-- CreateTable
CREATE TABLE "refunds" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "payment_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "razorpay_refund_id" TEXT,
    "amount_inr" BIGINT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'requested',
    "requested_by" UUID NOT NULL,
    "approved_by" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed_at" TIMESTAMPTZ(6),

    CONSTRAINT "refunds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "actor_id" UUID,
    "actor_role" TEXT,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "ip" INET,
    "user_agent" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_razorpay_subscription_id_key" ON "subscriptions"("razorpay_subscription_id");

-- CreateIndex
CREATE INDEX "subscriptions_user_id_status_idx" ON "subscriptions"("user_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "payments_razorpay_payment_id_key" ON "payments"("razorpay_payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_invoice_number_key" ON "payments"("invoice_number");

-- CreateIndex
CREATE UNIQUE INDEX "properties_reference_code_key" ON "properties"("reference_code");

-- CreateIndex
CREATE INDEX "properties_listing_status_auction_date_idx" ON "properties"("listing_status", "auction_date");

-- CreateIndex
CREATE INDEX "properties_general_location_idx" ON "properties"("general_location");

-- CreateIndex
CREATE INDEX "properties_recheck_due_at_idx" ON "properties"("recheck_due_at");

-- CreateIndex
CREATE INDEX "property_photos_property_id_sort_order_idx" ON "property_photos"("property_id", "sort_order");

-- CreateIndex
CREATE INDEX "property_documents_property_id_idx" ON "property_documents"("property_id");

-- CreateIndex
CREATE UNIQUE INDEX "property_risk_indicators_property_id_indicator_key" ON "property_risk_indicators"("property_id", "indicator");

-- CreateIndex
CREATE INDEX "forum_posts_property_id_created_at_idx" ON "forum_posts"("property_id", "created_at");

-- CreateIndex
CREATE INDEX "forum_posts_author_id_idx" ON "forum_posts"("author_id");

-- CreateIndex
CREATE UNIQUE INDEX "forum_votes_post_id_user_id_key" ON "forum_votes"("post_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "forum_follows_user_id_property_id_key" ON "forum_follows"("user_id", "property_id");

-- CreateIndex
CREATE INDEX "forum_reports_status_created_at_idx" ON "forum_reports"("status", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "watchlists_user_id_property_id_key" ON "watchlists"("user_id", "property_id");

-- CreateIndex
CREATE INDEX "inspections_user_id_created_at_idx" ON "inspections"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "inspections_property_id_idx" ON "inspections"("property_id");

-- CreateIndex
CREATE INDEX "inspections_status_idx" ON "inspections"("status");

-- CreateIndex
CREATE INDEX "advocate_enquiries_user_id_created_at_idx" ON "advocate_enquiries"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "advocate_enquiries_status_idx" ON "advocate_enquiries"("status");

-- CreateIndex
CREATE INDEX "notifications_user_id_read_at_idx" ON "notifications"("user_id", "read_at");

-- CreateIndex
CREATE INDEX "notifications_user_id_created_at_idx" ON "notifications"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "simulation_sessions_user_id_created_at_idx" ON "simulation_sessions"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "simulation_sessions_session_id_idx" ON "simulation_sessions"("session_id");

-- CreateIndex
CREATE INDEX "cost_calculations_user_id_created_at_idx" ON "cost_calculations"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- CreateIndex
CREATE INDEX "articles_slug_idx" ON "articles"("slug");

-- CreateIndex
CREATE INDEX "articles_published_at_idx" ON "articles"("published_at");

-- CreateIndex
CREATE UNIQUE INDEX "quizzes_slug_key" ON "quizzes"("slug");

-- CreateIndex
CREATE INDEX "quiz_questions_quiz_id_sort_order_idx" ON "quiz_questions"("quiz_id", "sort_order");

-- CreateIndex
CREATE INDEX "quiz_attempts_user_id_quiz_id_idx" ON "quiz_attempts"("user_id", "quiz_id");

-- CreateIndex
CREATE INDEX "quiz_attempts_session_id_idx" ON "quiz_attempts"("session_id");

-- CreateIndex
CREATE UNIQUE INDEX "badges_code_key" ON "badges"("code");

-- CreateIndex
CREATE INDEX "user_badges_user_id_awarded_at_idx" ON "user_badges"("user_id", "awarded_at");

-- CreateIndex
CREATE UNIQUE INDEX "user_badges_user_id_badge_id_key" ON "user_badges"("user_id", "badge_id");

-- CreateIndex
CREATE UNIQUE INDEX "learning_progress_user_id_article_id_key" ON "learning_progress"("user_id", "article_id");

-- CreateIndex
CREATE UNIQUE INDEX "learning_progress_user_id_quiz_id_key" ON "learning_progress"("user_id", "quiz_id");

-- CreateIndex
CREATE INDEX "property_enquiries_property_id_user_id_idx" ON "property_enquiries"("property_id", "user_id");

-- CreateIndex
CREATE INDEX "property_enquiries_status_idx" ON "property_enquiries"("status");

-- CreateIndex
CREATE INDEX "property_enquiry_messages_enquiry_id_created_at_idx" ON "property_enquiry_messages"("enquiry_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_invoice_number_key" ON "invoices"("invoice_number");

-- CreateIndex
CREATE INDEX "invoices_user_id_issued_at_idx" ON "invoices"("user_id", "issued_at");

-- CreateIndex
CREATE INDEX "invoices_invoice_number_idx" ON "invoices"("invoice_number");

-- CreateIndex
CREATE INDEX "invoices_payment_id_idx" ON "invoices"("payment_id");

-- CreateIndex
CREATE INDEX "webhook_events_status_received_at_idx" ON "webhook_events"("status", "received_at");

-- CreateIndex
CREATE UNIQUE INDEX "refunds_razorpay_refund_id_key" ON "refunds"("razorpay_refund_id");

-- CreateIndex
CREATE INDEX "refunds_user_id_created_at_idx" ON "refunds"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "refunds_status_idx" ON "refunds"("status");

-- CreateIndex
CREATE INDEX "audit_logs_actor_id_created_at_idx" ON "audit_logs"("actor_id", "created_at");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_entity_id_idx" ON "audit_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "audit_logs_action_created_at_idx" ON "audit_logs"("action", "created_at");

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_second_reviewer_id_fkey" FOREIGN KEY ("second_reviewer_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_photos" ADD CONSTRAINT "property_photos_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_documents" ADD CONSTRAINT "property_documents_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_documents" ADD CONSTRAINT "property_documents_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_status_history" ADD CONSTRAINT "property_status_history_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_status_history" ADD CONSTRAINT "property_status_history_changed_by_fkey" FOREIGN KEY ("changed_by") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_risk_indicators" ADD CONSTRAINT "property_risk_indicators_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_risk_indicators" ADD CONSTRAINT "property_risk_indicators_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum_posts" ADD CONSTRAINT "forum_posts_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum_posts" ADD CONSTRAINT "forum_posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum_posts" ADD CONSTRAINT "forum_posts_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "forum_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum_votes" ADD CONSTRAINT "forum_votes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "forum_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum_votes" ADD CONSTRAINT "forum_votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum_follows" ADD CONSTRAINT "forum_follows_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum_follows" ADD CONSTRAINT "forum_follows_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum_reports" ADD CONSTRAINT "forum_reports_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "forum_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum_reports" ADD CONSTRAINT "forum_reports_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum_reports" ADD CONSTRAINT "forum_reports_resolved_by_fkey" FOREIGN KEY ("resolved_by") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlists" ADD CONSTRAINT "watchlists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlists" ADD CONSTRAINT "watchlists_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advocate_enquiries" ADD CONSTRAINT "advocate_enquiries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advocate_enquiries" ADD CONSTRAINT "advocate_enquiries_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "simulation_sessions" ADD CONSTRAINT "simulation_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_calculations" ADD CONSTRAINT "cost_calculations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_calculations" ADD CONSTRAINT "cost_calculations_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_related_article_id_fkey" FOREIGN KEY ("related_article_id") REFERENCES "articles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "badges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_progress" ADD CONSTRAINT "learning_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_progress" ADD CONSTRAINT "learning_progress_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_progress" ADD CONSTRAINT "learning_progress_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_enquiries" ADD CONSTRAINT "property_enquiries_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_enquiries" ADD CONSTRAINT "property_enquiries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_enquiries" ADD CONSTRAINT "property_enquiries_assigned_admin_id_fkey" FOREIGN KEY ("assigned_admin_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_enquiry_messages" ADD CONSTRAINT "property_enquiry_messages_enquiry_id_fkey" FOREIGN KEY ("enquiry_id") REFERENCES "property_enquiries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_enquiry_messages" ADD CONSTRAINT "property_enquiry_messages_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Schema.md §5.2 check constraint not represented in Prisma's declarative schema.
ALTER TABLE "learning_progress"
  ADD CONSTRAINT "learning_progress_exactly_one_target_check"
  CHECK (("article_id" IS NOT NULL) <> ("quiz_id" IS NOT NULL));

-- Schema.md §6.1 — row-level security and least-privilege grants.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin' AND p.deleted_at IS NULL
  );
$$;

CREATE OR REPLACE FUNCTION public.is_paid_member(p_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT CASE
    WHEN p_user_id IS DISTINCT FROM auth.uid() AND NOT public.is_admin() THEN false
    ELSE EXISTS (
      SELECT 1 FROM public.subscriptions s
      WHERE s.user_id = p_user_id
        AND ((s.status = 'active' AND s.current_period_end > now())
          OR (s.status = 'past_due' AND s.current_period_end + interval '3 days' > now())
          OR (s.status = 'cancelled' AND s.current_period_end > now()))
    )
  END;
$$;

CREATE OR REPLACE FUNCTION public.is_premium_member(p_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT CASE
    WHEN p_user_id IS DISTINCT FROM auth.uid() AND NOT public.is_admin() THEN false
    ELSE EXISTS (
      SELECT 1 FROM public.subscriptions s
      WHERE s.user_id = p_user_id AND s.tier = 'premium'
        AND ((s.status = 'active' AND s.current_period_end > now())
          OR (s.status = 'past_due' AND s.current_period_end + interval '3 days' > now())
          OR (s.status = 'cancelled' AND s.current_period_end > now()))
    )
  END;
$$;

CREATE OR REPLACE FUNCTION public.has_property_access(p_property_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT public.is_paid_member(auth.uid()) AND EXISTS (
    SELECT 1 FROM public.properties p
    WHERE p.id = p_property_id AND p.deleted_at IS NULL
  );
$$;

CREATE OR REPLACE FUNCTION public.has_enquiry_access(p_enquiry_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT public.is_admin() OR EXISTS (
    SELECT 1 FROM public.property_enquiries e
    WHERE e.id = p_enquiry_id AND e.user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.can_request_inspection(p_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT CASE
    WHEN public.is_premium_member(p_user_id) THEN true
    WHEN NOT public.is_paid_member(p_user_id) THEN false
    ELSE (
      SELECT count(*) < 5
      FROM public.inspections i
      WHERE i.user_id = p_user_id
        AND date_trunc('month', i.created_at) = date_trunc('month', now())
    )
  END;
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_paid_member(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_premium_member(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_property_access(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_enquiry_access(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.can_request_inspection(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_paid_member(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_premium_member(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.has_property_access(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.has_enquiry_access(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.can_request_inspection(uuid) TO authenticated, service_role;

DO $$
DECLARE table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'profiles', 'subscriptions', 'payments', 'properties', 'property_photos',
    'property_documents', 'property_status_history', 'property_risk_indicators',
    'forum_posts', 'forum_votes', 'forum_follows', 'forum_reports', 'watchlists',
    'inspections', 'advocate_enquiries', 'notifications', 'simulation_sessions',
    'cost_calculations', 'articles', 'quizzes', 'quiz_questions', 'quiz_attempts',
    'badges', 'user_badges', 'learning_progress', 'property_enquiries',
    'property_enquiry_messages', 'invoices', 'webhook_events', 'refunds', 'audit_logs'
  ] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_name);
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM PUBLIC, anon, authenticated', table_name);
  END LOOP;
END $$;

-- Functions are security-definer and use a pinned search_path to avoid RLS recursion.
CREATE POLICY profiles_select ON profiles FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.is_admin());
CREATE POLICY profiles_update ON profiles FOR UPDATE TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE POLICY subscriptions_select ON subscriptions FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY payments_select ON payments FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY refunds_select ON refunds FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY invoices_select ON invoices FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY properties_select ON properties FOR SELECT TO authenticated
  USING (public.is_paid_member(auth.uid()) OR public.is_admin());
CREATE POLICY properties_insert ON properties FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());
CREATE POLICY properties_update ON properties FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY properties_delete ON properties FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE POLICY property_photos_select ON property_photos FOR SELECT TO authenticated
  USING (public.is_admin() OR public.has_property_access(property_id));
CREATE POLICY property_photos_insert ON property_photos FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());
CREATE POLICY property_photos_update ON property_photos FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY property_photos_delete ON property_photos FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE POLICY property_documents_select ON property_documents FOR SELECT TO authenticated
  USING (public.is_admin() OR (is_member_accessible AND public.has_property_access(property_id)));
CREATE POLICY property_documents_insert ON property_documents FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());
CREATE POLICY property_documents_update ON property_documents FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY property_documents_delete ON property_documents FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE POLICY property_status_history_select ON property_status_history FOR SELECT TO authenticated
  USING (public.is_admin());
CREATE POLICY property_status_history_insert ON property_status_history FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());
CREATE POLICY property_status_history_update ON property_status_history FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY property_status_history_delete ON property_status_history FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE POLICY property_risk_indicators_select ON property_risk_indicators FOR SELECT TO authenticated
  USING (public.is_admin() OR public.has_property_access(property_id));
CREATE POLICY property_risk_indicators_insert ON property_risk_indicators FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());
CREATE POLICY property_risk_indicators_update ON property_risk_indicators FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY property_risk_indicators_delete ON property_risk_indicators FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE POLICY property_enquiries_select ON property_enquiries FOR SELECT TO authenticated
  USING ((user_id = auth.uid() AND public.is_paid_member(auth.uid())) OR public.is_admin());
CREATE POLICY property_enquiries_insert ON property_enquiries FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND public.is_paid_member(auth.uid()));
CREATE POLICY property_enquiries_update ON property_enquiries FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY property_enquiries_delete ON property_enquiries FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE POLICY property_enquiry_messages_select ON property_enquiry_messages FOR SELECT TO authenticated
  USING ((public.has_enquiry_access(enquiry_id) AND public.is_paid_member(auth.uid())) OR public.is_admin());
CREATE POLICY property_enquiry_messages_insert ON property_enquiry_messages FOR INSERT TO authenticated
  WITH CHECK (
    public.is_admin() OR
    (author_id = auth.uid() AND author_role = 'member' AND public.is_paid_member(auth.uid()) AND public.has_enquiry_access(enquiry_id))
  );
CREATE POLICY property_enquiry_messages_update ON property_enquiry_messages FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY property_enquiry_messages_delete ON property_enquiry_messages FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE POLICY forum_posts_select ON forum_posts FOR SELECT TO authenticated
  USING ((public.is_paid_member(auth.uid()) AND public.has_property_access(property_id)) OR public.is_admin());
CREATE POLICY forum_posts_insert ON forum_posts FOR INSERT TO authenticated
  WITH CHECK (author_id = auth.uid() AND public.is_paid_member(auth.uid()) AND public.has_property_access(property_id));
CREATE POLICY forum_posts_update ON forum_posts FOR UPDATE TO authenticated
  USING (author_id = auth.uid() AND now() - created_at < interval '15 minutes')
  WITH CHECK (author_id = auth.uid() AND now() - created_at < interval '15 minutes');
CREATE POLICY forum_posts_delete ON forum_posts FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE POLICY forum_votes_select ON forum_votes FOR SELECT TO authenticated
  USING (public.is_paid_member(auth.uid()) OR public.is_admin());
CREATE POLICY forum_votes_insert ON forum_votes FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND public.is_paid_member(auth.uid()));
CREATE POLICY forum_votes_delete ON forum_votes FOR DELETE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY forum_follows_select ON forum_follows FOR SELECT TO authenticated
  USING (user_id = auth.uid() AND public.is_paid_member(auth.uid()));
CREATE POLICY forum_follows_insert ON forum_follows FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY forum_follows_delete ON forum_follows FOR DELETE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY forum_reports_select ON forum_reports FOR SELECT TO authenticated
  USING ((reporter_id = auth.uid() AND public.is_paid_member(auth.uid())) OR public.is_admin());
CREATE POLICY forum_reports_insert ON forum_reports FOR INSERT TO authenticated
  WITH CHECK (reporter_id = auth.uid() AND public.is_paid_member(auth.uid()));
CREATE POLICY forum_reports_update ON forum_reports FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY watchlists_select ON watchlists FOR SELECT TO authenticated
  USING (user_id = auth.uid() AND public.is_paid_member(auth.uid()));
CREATE POLICY watchlists_insert ON watchlists FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND public.is_paid_member(auth.uid()));
CREATE POLICY watchlists_delete ON watchlists FOR DELETE TO authenticated
  USING (user_id = auth.uid() AND public.is_paid_member(auth.uid()));

CREATE POLICY inspections_select ON inspections FOR SELECT TO authenticated
  USING ((user_id = auth.uid() AND public.is_paid_member(auth.uid())) OR public.is_admin());
CREATE POLICY inspections_insert ON inspections FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND public.is_paid_member(auth.uid()) AND public.can_request_inspection(auth.uid()));
CREATE POLICY inspections_update ON inspections FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY inspections_delete ON inspections FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE POLICY advocate_enquiries_select ON advocate_enquiries FOR SELECT TO authenticated
  USING ((user_id = auth.uid() AND public.is_paid_member(auth.uid())) OR public.is_admin());
CREATE POLICY advocate_enquiries_insert ON advocate_enquiries FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND public.is_premium_member(auth.uid()));
CREATE POLICY advocate_enquiries_update ON advocate_enquiries FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY notifications_select ON notifications FOR SELECT TO authenticated
  USING (user_id = auth.uid() AND public.is_paid_member(auth.uid()));
CREATE POLICY notifications_update ON notifications FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY simulation_sessions_select ON simulation_sessions FOR SELECT TO anon, authenticated
  USING (public.is_paid_member(auth.uid()) AND user_id = auth.uid());
CREATE POLICY simulation_sessions_insert ON simulation_sessions FOR INSERT TO anon, authenticated
  WITH CHECK ((user_id = auth.uid()) OR (user_id IS NULL AND session_id = current_setting('request.session_id', true)));
CREATE POLICY simulation_sessions_update ON simulation_sessions FOR UPDATE TO anon, authenticated
  USING ((user_id = auth.uid()) OR (user_id IS NULL AND session_id = current_setting('request.session_id', true)))
  WITH CHECK ((user_id = auth.uid()) OR (user_id IS NULL AND session_id = current_setting('request.session_id', true)));
CREATE POLICY simulation_sessions_delete ON simulation_sessions FOR DELETE TO anon, authenticated
  USING ((user_id = auth.uid()) OR (user_id IS NULL AND session_id = current_setting('request.session_id', true)));

CREATE POLICY cost_calculations_select ON cost_calculations FOR SELECT TO authenticated
  USING (user_id = auth.uid() AND public.is_paid_member(auth.uid()));
CREATE POLICY cost_calculations_insert ON cost_calculations FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);
CREATE POLICY cost_calculations_update ON cost_calculations FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY cost_calculations_delete ON cost_calculations FOR DELETE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY articles_select ON articles FOR SELECT TO anon, authenticated
  USING ((published_at IS NOT NULL AND deleted_at IS NULL) OR public.is_admin());
CREATE POLICY articles_insert ON articles FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());
CREATE POLICY articles_update ON articles FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY articles_delete ON articles FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE POLICY quizzes_select ON quizzes FOR SELECT TO anon, authenticated
  USING ((is_published AND deleted_at IS NULL) OR public.is_admin());
CREATE POLICY quizzes_insert ON quizzes FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());
CREATE POLICY quizzes_update ON quizzes FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY quizzes_delete ON quizzes FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE POLICY quiz_questions_select ON quiz_questions FOR SELECT TO anon, authenticated
  USING (EXISTS (SELECT 1 FROM quizzes q WHERE q.id = quiz_id AND q.is_published AND q.deleted_at IS NULL) OR public.is_admin());
CREATE POLICY quiz_questions_insert ON quiz_questions FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());
CREATE POLICY quiz_questions_update ON quiz_questions FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY quiz_questions_delete ON quiz_questions FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE POLICY quiz_attempts_select ON quiz_attempts FOR SELECT TO anon, authenticated
  USING (public.is_paid_member(auth.uid()) AND user_id = auth.uid());
CREATE POLICY quiz_attempts_insert ON quiz_attempts FOR INSERT TO anon, authenticated
  WITH CHECK ((user_id = auth.uid()) OR (user_id IS NULL AND session_id = current_setting('request.session_id', true)));

CREATE POLICY badges_select ON badges FOR SELECT TO anon, authenticated
  USING (is_active OR public.is_admin());
CREATE POLICY badges_insert ON badges FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());
CREATE POLICY badges_update ON badges FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY badges_delete ON badges FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE POLICY user_badges_select ON user_badges FOR SELECT TO authenticated
  USING ((user_id = auth.uid() AND public.is_paid_member(auth.uid())) OR public.is_admin());
CREATE POLICY learning_progress_select ON learning_progress FOR SELECT TO authenticated
  USING (user_id = auth.uid() AND public.is_paid_member(auth.uid()));
CREATE POLICY learning_progress_insert ON learning_progress FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY learning_progress_update ON learning_progress FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY learning_progress_delete ON learning_progress FOR DELETE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY audit_logs_select ON audit_logs FOR SELECT TO authenticated
  USING (public.is_admin());

-- Least-privilege SQL grants; row policies further filter each granted operation.
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON articles, quizzes, quiz_questions, badges TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON
  profiles, subscriptions, payments, refunds, invoices, property_documents,
  property_status_history, property_risk_indicators, property_enquiries,
  property_enquiry_messages, forum_posts, forum_votes, forum_follows,
  forum_reports, watchlists, inspections, advocate_enquiries, notifications,
  simulation_sessions, cost_calculations, articles, quizzes, quiz_questions,
  quiz_attempts, badges, user_badges, learning_progress, audit_logs
TO authenticated;
REVOKE ALL ON properties, property_photos, property_documents FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON profiles FROM authenticated;
GRANT UPDATE (full_name, phone, gstin, updated_at, deleted_at) ON profiles TO authenticated;
REVOKE INSERT, UPDATE, DELETE ON subscriptions, payments, refunds, invoices, webhook_events, user_badges, audit_logs FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON notifications FROM authenticated;
GRANT UPDATE (read_at) ON notifications TO authenticated;
REVOKE INSERT, UPDATE, DELETE ON quiz_attempts FROM authenticated;
GRANT INSERT ON quiz_attempts TO authenticated;
REVOKE UPDATE, DELETE ON articles, quizzes, quiz_questions, badges FROM authenticated;
REVOKE UPDATE ON forum_votes, forum_follows, watchlists FROM authenticated;
REVOKE DELETE ON advocate_enquiries FROM authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON simulation_sessions TO anon;
REVOKE SELECT ON forum_votes FROM anon;
GRANT SELECT ON forum_votes TO authenticated;
REVOKE SELECT ON simulation_sessions, quiz_attempts FROM anon;
GRANT INSERT ON quiz_attempts TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Supabase service-role requests bypass RLS, but still require SQL grants.
REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM service_role;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO service_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO service_role;
-- These append-only / user-scoped contracts remain restricted even for the service role.
REVOKE SELECT, UPDATE, DELETE ON audit_logs FROM service_role;
GRANT INSERT ON audit_logs TO service_role;
REVOKE UPDATE ON notifications FROM service_role;
REVOKE DELETE ON notifications FROM service_role;
REVOKE UPDATE, DELETE ON webhook_events FROM service_role;

-- Aggregate-only vote view; no direct client read on individual vote rows is needed.
CREATE VIEW forum_vote_counts AS
SELECT post_id, count(*)::integer AS upvote_count
FROM forum_votes
WHERE public.is_paid_member(auth.uid()) OR public.is_admin()
GROUP BY post_id;
REVOKE ALL ON forum_vote_counts FROM PUBLIC, anon;
GRANT SELECT ON forum_vote_counts TO authenticated;
